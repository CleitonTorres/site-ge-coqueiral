export type RegistrationField = { id: string; label: string; type: 'text' | 'email' | 'tel' | 'textarea' | 'select'; required: boolean; options?: string[] };
export type Kit = { id: string; name: string; description: string; priceCents: number; maxQuantity: number };
export type RegistrationForm = { slug: string; title: string; description: string; instructions: string; open: boolean; driveFolderId: string; fields: RegistrationField[]; kits: Kit[]; maxFiles: number; maxFileSizeMB: number; filesRequired: boolean; revision: string };
export type PublicForm = Omit<RegistrationForm, 'driveFolderId'>;
export const DEFAULT_REGISTRATION_DRIVE_ROOT = '1U6bQrAscHz_oso-vQAdE4TdeCjSNQh7G';
export const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export const festivalTemplate: RegistrationForm = {
  slug: 'festival-de-pipas-2026', title: '3ª Edição Festival de Pipas — 2026',
  description: 'Venha construir sua pipa, compartilhar histórias e colorir o céu conosco! Uma iniciativa do 19º Grupo Escoteiro Coqueiral para aproximar gerações e celebrar a alegria de brincar juntos.',
  instructions: 'É proibido usar linhas com cerol.\nLocal: sede do 19º Grupo Escoteiro Coqueiral, anexo Oficina de Artes.\n14h30: Oficina Monte sua Pipa. 15h30: Festival de Pipas.\nNo pagamento, adicione a descrição “Inscrição Festival de Pipas”.\nA organização oferece tesoura, cola e fita adesiva para a oficina.',
  open: false, driveFolderId: DEFAULT_REGISTRATION_DRIVE_ROOT, revision: '', fields: [{ id: 'nome', label: 'Seu nome', type: 'text', required: true }],
  kits: [
    { id: 'kit-01', name: 'Kit 01 — Monte sua Pipa', description: 'Varetas, linha para montagem, uma folha de seda, carretel de linha de 100 jardas e rabiola cortada.', priceCents: 1500, maxQuantity: 100 },
    { id: 'kit-02', name: 'Kit 02 — Decore sua Pipa', description: 'Armação pronta de 50 cm, uma folha de papel seda e 2 m de rabiola pronta.', priceCents: 800, maxQuantity: 100 },
    { id: 'pipa-pronta', name: 'Pipa pronta', description: 'Pipa de 55 cm em cores sortidas e 2 m de rabiola pronta.', priceCents: 800, maxQuantity: 100 },
    { id: 'linha', name: 'Linha avulsa', description: '100 jardas, nº 10.', priceCents: 500, maxQuantity: 100 },
    { id: 'rabiola', name: 'Rabiola avulsa', description: '2 m de rabiola.', priceCents: 200, maxQuantity: 100 },
  ], maxFiles: 5, maxFileSizeMB: 10, filesRequired: true,
};

export function publicForm(form: RegistrationForm): PublicForm {
  const { driveFolderId: _folder, ...visible } = form;
  return visible;
}
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validateForm(value: unknown): RegistrationForm {
  if (!value || typeof value !== 'object') throw new Error('Formulário inválido.');
  const f = value as RegistrationForm;
  if (typeof f.slug !== 'string' || !idPattern.test(f.slug) || f.slug.length > 80) throw new Error('Use um endereço com letras minúsculas, números e hífens.');
  if (typeof f.title !== 'string' || !f.title.trim() || f.title.length > 200) throw new Error('Informe um título de até 200 caracteres.');
  if (typeof f.description !== 'string' || f.description.length > 5000 || typeof f.instructions !== 'string' || f.instructions.length > 10000) throw new Error('Descrição ou orientações inválidas.');
  if (typeof f.open !== 'boolean' || typeof f.filesRequired !== 'boolean') throw new Error('Configuração de abertura ou anexos inválida.');
  if (typeof f.driveFolderId !== 'string' || (f.driveFolderId && !/^[\w-]{10,200}$/.test(f.driveFolderId))) throw new Error('Informe um ID válido de pasta do Drive ou deixe vazio para usar o padrão.');
  if (!Number.isInteger(f.maxFiles) || f.maxFiles < 0 || f.maxFiles > 5 || !Number.isInteger(f.maxFileSizeMB) || f.maxFileSizeMB < 1 || f.maxFileSizeMB > 10 || (f.filesRequired && !f.maxFiles)) throw new Error('Configure até 5 anexos de até 10 MB cada.');
  if (!Array.isArray(f.fields) || !f.fields.length || f.fields.length > 30 || !Array.isArray(f.kits) || f.kits.length > 30) throw new Error('Configure entre 1 e 30 campos e até 30 kits.');
  const ids = new Set<string>();
  for (const field of f.fields) {
    if (!field || typeof field.id !== 'string' || !idPattern.test(field.id) || field.id.length > 80 || ids.has(field.id) || typeof field.label !== 'string' || !field.label.trim() || field.label.length > 200 || !['text','email','tel','textarea','select'].includes(field.type) || typeof field.required !== 'boolean') throw new Error('Revise os campos: identificadores únicos, título e tipo são obrigatórios.');
    ids.add(field.id);
    if (field.type === 'select' && (!Array.isArray(field.options) || !field.options.length || field.options.length > 50 || field.options.some(o => typeof o !== 'string' || !o.trim() || o.length > 200))) throw new Error('Informe as opções do campo de seleção.');
  }
  ids.clear();
  for (const kit of f.kits) {
    if (!kit || typeof kit.id !== 'string' || !idPattern.test(kit.id) || kit.id.length > 80 || ids.has(kit.id) || typeof kit.name !== 'string' || !kit.name.trim() || kit.name.length > 200 || typeof kit.description !== 'string' || kit.description.length > 1000 || !Number.isSafeInteger(kit.priceCents) || kit.priceCents < 0 || kit.priceCents > 10000000 || !Number.isInteger(kit.maxQuantity) || kit.maxQuantity < 1 || kit.maxQuantity > 100) throw new Error('Revise os kits, preços e limites de quantidade.');
    ids.add(kit.id);
  }
  // Persist only declared properties, never Mongo operators or client-provided revision.
  return { slug: f.slug, title: f.title.trim(), description: f.description, instructions: f.instructions, open: f.open, driveFolderId: f.driveFolderId || DEFAULT_REGISTRATION_DRIVE_ROOT, fields: f.fields.map(field => ({id: field.id, label: field.label.trim(), type: field.type, required: field.required, ...(field.type === 'select' ? {options: field.options} : {})})), kits: f.kits.map(kit => ({id: kit.id, name: kit.name.trim(), description: kit.description, priceCents: kit.priceCents, maxQuantity: kit.maxQuantity})), maxFiles: f.maxFiles, maxFileSizeMB: f.maxFileSizeMB, filesRequired: f.filesRequired, revision: '' };
}
export function validateAnswers(form: PublicForm, value: unknown) {
  const payload = value as { answers?: Record<string, unknown>; quantities?: Record<string, unknown> };
  if (!payload || typeof payload.answers !== 'object' || !payload.answers || Array.isArray(payload.answers) || typeof payload.quantities !== 'object' || !payload.quantities || Array.isArray(payload.quantities)) throw new Error('Dados da inscrição inválidos.');
  const answers: Record<string, string> = {};
  for (const field of form.fields) {
    const raw = payload.answers[field.id] ?? '';
    if (typeof raw !== 'string' || raw.length > 5000) throw new Error(`Revise o campo ${field.label}.`);
    const answer = raw.trim();
    if (field.required && !answer) throw new Error(`Preencha ${field.label}.`);
    if (answer && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer)) throw new Error('Informe um e-mail válido.');
    if (answer && field.type === 'select' && !field.options?.includes(answer)) throw new Error(`Escolha uma opção válida para ${field.label}.`);
    answers[field.id] = answer;
  }
  if (Object.keys(payload.quantities).some(id => !form.kits.some(kit => kit.id === id))) throw new Error('Kit não reconhecido.');
  const kits = form.kits.map(kit => {
    const quantity = payload.quantities![kit.id] ?? 0;
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0 || quantity > kit.maxQuantity) throw new Error(`Informe uma quantidade de 0 a ${kit.maxQuantity} para ${kit.name}.`);
    return { ...kit, quantity, subtotalCents: kit.priceCents * quantity };
  }).filter(kit => kit.quantity > 0);
  if (form.kits.length && !kits.length) throw new Error('Escolha a quantidade de pelo menos um kit.');
  return { answers, kits, totalCents: kits.reduce((sum, kit) => sum + kit.subtotalCents, 0) };
}
