import "server-only";
import { randomUUID } from "node:crypto";
import { registrationDb } from "@/server/registrations";
import { newRegistrationEmail } from "@/emails/templates/new-registration";
import { emailConfiguration, sendTemplateEmail } from "./transport";

export async function notifyRegistration(id: string) {
  emailConfiguration();

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
  if (existing.adminEmail?.status === "sent") return { status: "sent" };
  
  const attemptId = randomUUID();
  const claimed = await collection.findOneAndUpdate(
    {
      registrationId: id,
      status: "completed",
      $or: [
        { "adminEmail.status": { $exists: false } },
        { "adminEmail.status": "failed" },
        {
          "adminEmail.status": "sending",
          "adminEmail.startedAt": { $lt: new Date(Date.now() - 5 * 60 * 1000) },
        },
      ],
    },
    {
      $set: {
        adminEmail: { status: "sending", startedAt: new Date(), attemptId },
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

    const template = newRegistrationEmail({
      protocol: claimed.protocol || id,
      title: form?.title || claimed.slug,
      name: claimed.answers?.name || claimed.answers?.nome || "Não informado",
      submittedAt: new Date(claimed.submittedAt),
      kits: claimed.kits || [],
      totalCents: claimed.totalCents || 0,
      dashboardUrl: new URL("/administrativo/area-restrita", siteUrl).href,
    });
    
    const messageId = await sendTemplateEmail(template);
    await collection.updateOne(
      { registrationId: id, "adminEmail.attemptId": attemptId },
      {
        $set: {
          "adminEmail.status": "sent",
          "adminEmail.sentAt": new Date(),
          "adminEmail.messageId": messageId,
        },
      },
    );
    return { status: "sent" };
  } catch (error) {
    await collection.updateOne(
      { registrationId: id, "adminEmail.attemptId": attemptId },
      {
        $set: {
          "adminEmail.status": "failed",
          "adminEmail.failedAt": new Date(),
        },
      },
    );
    throw error;
  }
}
