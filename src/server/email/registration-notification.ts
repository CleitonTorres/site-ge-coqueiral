import { registrationConfirmationEmail } from "@/emails/templates/registration-confirmation";
import "server-only";
import { randomUUID } from "node:crypto";
import { registrationDb } from "@/server/registrations";
import { newRegistrationEmail } from "@/emails/templates/new-registration";
import { sendTemplateEmail } from "./transport";

async function notifyChannel(id: string, channel: "adminEmail" | "participantEmailNotification") {


  const siteUrl = new URL(
    process.env.EMAIL_SITE_URL || "https://www.grupoescoteirocoqueiral.org.br",
  );

  if (!["https:", "http:"].includes(siteUrl.protocol))
    throw new Error("EMAIL_NOT_CONFIGURED");
  
  const collection = (await registrationDb()).collection("registrations");
  const existing = await collection.findOne({
    registrationId: id,
    status: "completed",
  });

  if (!existing) return { status: "not-found" };
  if (channel === "participantEmailNotification" && !existing.participantEmail) return {status: "skipped"};
  if (existing[channel]?.status === "sent") return { status: "sent" };
  
  const attemptId = randomUUID();
  const claimed = await collection.findOneAndUpdate(
    {
      registrationId: id,
      status: "completed",
      $or: [
        { [`${channel}.status`]: { $exists: false } },
        { [`${channel}.status`]: "failed" },
        {
          [`${channel}.status`]: "sending",
          [`${channel}.startedAt`]: { $lt: new Date(Date.now() - 5 * 60 * 1000) },
        },
      ],
    },
    {
      $set: {
        [channel]: { status: "sending", startedAt: new Date(), attemptId },
      },
    },
    { returnDocument: "after" },
  );

  if (!claimed) return { status: "processing" };
  
  try {
    const form =
      claimed.formSnapshot ||
      (await (await registrationDb())
        .collection("registrationForms")
        .findOne({ slug: claimed.slug }));

    const data = {
      protocol: claimed.protocol || id,
      title: form?.title || claimed.slug,
      name: claimed.answers?.name || claimed.answers?.nome || "Não informado",
      submittedAt: new Date(claimed.submittedAt),
      kits: claimed.kits || [],
      totalCents: claimed.totalCents || 0,
      dashboardUrl: new URL("/administrativo/area-restrita", siteUrl).href,
    };
    
    const template = channel === 'adminEmail' ? newRegistrationEmail(data) : registrationConfirmationEmail({...data,
      answers: [...Object.entries(claimed.answers || {}).map(([key, value]) => [form?.fields?.find((field: {id: string; label: string}) => field.id === key)?.label || key, String(value)] as [string, string]), ['E-mail de confirmação', claimed.participantEmail]],
    });
    const messageId = await sendTemplateEmail(template, channel === 'participantEmailNotification' ? claimed.participantEmail : undefined);
    await collection.updateOne(
      { registrationId: id, [`${channel}.attemptId`]: attemptId },
      {
        $set: {
          [`${channel}.status`]: "sent",
          [`${channel}.sentAt`]: new Date(),
          [`${channel}.messageId`]: messageId,
        },
      },
    );
    return { status: "sent" };
  } catch (error) {
    await collection.updateOne(
      { registrationId: id, [`${channel}.attemptId`]: attemptId },
      {
        $set: {
          [`${channel}.status`]: "failed",
          [`${channel}.failedAt`]: new Date(),
        },
      },
    );
    throw error;
  }
}

export async function notifyRegistration(id: string) {
  const results = await Promise.allSettled([notifyChannel(id, 'adminEmail'), notifyChannel(id, 'participantEmailNotification')]);
  const status = (result: PromiseSettledResult<{status: string}>) => result.status === 'fulfilled' ? result.value.status : 'failed';
  const adminStatus = status(results[0]);
  const participantEmailStatus = status(results[1]);
  if (results.some(result => result.status === 'rejected')) console.warn('[emails] falha de notificação', {registrationId: id, adminStatus, participantEmailStatus});
  return {status: adminStatus === 'not-found' ? 'not-found' : adminStatus === 'processing' ? 'processing' : adminStatus === 'sent' ? 'sent' : 'failed', adminStatus, participantEmailStatus};
}
