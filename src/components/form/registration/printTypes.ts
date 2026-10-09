export type PrintableRegistration = {
  registrationId: string; protocol?: string; submittedAt: string;
  form: { title: string; fields: { id: string; label: string }[] };
  answers: Record<string, string>;
  kits: { name: string; quantity: number }[]; totalCents: number;
};
export function participantName(record: PrintableRegistration) {
  const field = record.form.fields.find(field => /^(nome|nome completo|seu nome|nome do participante)$/i.test(field.label.trim()));
  return record.answers.nome || record.answers.name || (field && record.answers[field.id]) || 'Participante';
}
