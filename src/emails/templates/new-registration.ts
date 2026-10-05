import { emailLayout, emailDataRows } from "./layout";
export type RegistrationEmail = {
  protocol: string;
  title: string;
  name: string;
  submittedAt: Date;
  kits: { name: string; quantity: number; subtotalCents: number }[];
  totalCents: number;
  dashboardUrl: string;
};

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

const money = (value: number) =>
  (value / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function newRegistrationEmail(data: RegistrationEmail) {
  const date = data.submittedAt.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const text = [
    "Nova inscrição recebida",
    data.title,
    `Protocolo: ${data.protocol}`,
    `Participante: ${data.name}`,
    `Recebida em: ${date}`,
    ...data.kits.map(
      (kit) => `${kit.quantity} × ${kit.name}: ${money(kit.subtotalCents)}`,
    ),
    `Total: ${money(data.totalCents)}`,
    "O pagamento precisa ser conferido pela organização.",
    `Consultar inscrição e comprovantes: ${data.dashboardUrl}`,
  ].join("\n");
  
  return {
    subject: `Nova inscrição: ${data.protocol} — ${data.title}`.replace(
      /[\r\n]/g,
      " ",
    ),
    text,
    html: emailLayout({
      title: "Nova inscrição recebida",
      preview: `${data.title} · ${data.protocol}`,
      content: `<p style="font-size:18px">${escape(data.title)}</p>${emailDataRows(
        [
          ["Protocolo", data.protocol],
          ["Participante", data.name],
          ["Recebida em", date],
        ],
      )}${data.kits.length ? `<h2 style="font-size:18px">Kits solicitados</h2><ul>${data.kits.map((kit) => `<li>${kit.quantity} × ${escape(kit.name)} — ${money(kit.subtotalCents)}</li>`).join("")}</ul>` : ""}<p style="padding:16px;background:#eef2df"><strong>Total: ${money(data.totalCents)}</strong><br>O pagamento precisa ser conferido pela organização.</p><p style="margin:28px 0"><a href="${escape(data.dashboardUrl)}" style="display:inline-block;padding:14px 20px;background:#192d4b;color:white;text-decoration:none;font-weight:bold;border-radius:6px">Consultar inscrição →</a></p><p style="font-size:12px;color:#555">Entre no acesso restrito para visualizar os dados e comprovantes. Este e-mail não contém anexos.</p>`,
    }),
  };
}
