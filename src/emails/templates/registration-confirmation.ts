import { emailLayout, emailDataRows, escapeEmail } from './layout';
import type { RegistrationEmail } from './new-registration';

export function registrationConfirmationEmail(data: RegistrationEmail & {answers: [string, string][]}) {
  const money = (value: number) => (value / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  const date = data.submittedAt.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
  const rows: [string, string][] = [['Protocolo', data.protocol], ['Recebida em', date], ...data.answers];
  return {
    subject: `Inscrição recebida: ${data.protocol} — ${data.title}`.replace(/[\r\n]/g, ' '),
    text: [`Olá, ${data.name}!`, `Recebemos sua inscrição em ${data.title}.`, ...rows.map(([label, value]) => `${label}: ${value}`), ...data.kits.map(kit => `${kit.quantity} × ${kit.name}: ${money(kit.subtotalCents)}`), `Total: ${money(data.totalCents)}`, 'Guarde seu protocolo. O pagamento ainda será conferido pela organização. Esta mensagem confirma o recebimento da inscrição, não a aprovação do pagamento.'].join('\n'),
    html: emailLayout({title: 'Recebemos sua inscrição!', preview: `${data.title} · Protocolo ${data.protocol}`, content: `<p>Olá, ${escapeEmail(data.name)}!</p><p>Recebemos sua inscrição em <strong>${escapeEmail(data.title)}</strong>. Confira os dados abaixo e guarde seu protocolo.</p>${emailDataRows(rows)}${data.kits.length ? `<h2 style="font-size:18px">Kits solicitados</h2><ul>${data.kits.map(kit => `<li>${kit.quantity} × ${escapeEmail(kit.name)} — ${money(kit.subtotalCents)}</li>`).join('')}</ul>` : ''}<p style="padding:16px;background:#eef2df"><strong>Total: ${money(data.totalCents)}</strong></p><p>O pagamento ainda será conferido pela organização. Esta mensagem confirma o recebimento da inscrição, não a aprovação do pagamento.</p>`}),
  };
}
