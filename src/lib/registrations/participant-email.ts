export function validateParticipantEmail(value: unknown): string {
  if (typeof value !== 'string' || value.length > 254 || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(value.trim())) throw new Error('Informe um e-mail válido para receber a confirmação.');
  return value.trim();
}
