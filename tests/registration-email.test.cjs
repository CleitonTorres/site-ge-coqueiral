const {test} = require('node:test');
const assert = require('node:assert/strict');
const {createHmac} = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
function load(relative, mocks = {}) {
  const filename = path.resolve(__dirname, relative), loaded = new Module(filename);
  loaded.paths = module.paths;
  const original = loaded.require.bind(loaded);
  loaded.require = name => name in mocks ? mocks[name] : original(name);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, esModuleInterop: true}}).outputText, filename);
  return loaded.exports;
}
const layout = load('../src/emails/templates/layout.ts');
const {newRegistrationEmail} = load('../src/emails/templates/new-registration.ts', {'./layout': layout});
const {emailNotificationId} = load('../src/server/email/notification-token.ts');
test('template antigo mantém dados e usa layout compartilhado com HTML escapado', () => {
  const {newSAAEEmail} = load('../src/emails/templates/new-saae.ts', {'./layout': layout});
  const html = newSAAEEmail({body: {user: {name: '<script>nome</script>', email: 'teste@example.com', dadosBasicosUels: {numUel: 19, ufUel: 'ES', nameUel: 'Coqueiral'}}, saae: {name: 'Acampamento', dataInicio: '10/10/2026', dataFim: '11/10/2026', local: 'Campo escola', status: 'Pendente', _id: '123'}}});
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /Acampamento/);
  assert.match(html, /Grupo Escoteiro Coqueiral/);
  assert.match(html, /role="presentation"/);
  assert.doesNotMatch(html, /style=\{\{/);
});
test('token exige assinatura, escopo dedicado e validade curta', () => {
  const secret = 'test-only-123456789012345678901234567890';
  const sign = payload => {const data = Buffer.from(JSON.stringify(payload)).toString('base64url'); return `${data}.${createHmac('sha256', secret).update(data).digest('base64url')}`;};
  const payload = {scope: 'registration-email', id: 'uuid', expires: Date.now() + 60000};
  assert.equal(emailNotificationId(sign(payload), secret), 'uuid');
  assert.equal(emailNotificationId(sign({...payload, scope: 'registration-upload'}), secret), null);
  assert.equal(emailNotificationId(sign({...payload, expires: 0}), secret), null);
  assert.equal(emailNotificationId(sign(payload) + 'x', secret), null);
});
test('template escapa dados do participante, tem texto e não inclui anexos', () => {
  const result = newRegistrationEmail({protocol: 'ABCD-2345', title: 'Pipas', name: '<img src=x>', submittedAt: new Date(), kits: [], totalCents: 1200, dashboardUrl: 'https://example.com/administrativo'});
  assert.match(result.html, /&lt;img src=x&gt;/);
  assert.match(result.text, /ABCD-2345/);
  assert.equal(result.attachments, undefined);
});
test('notificação só envia concluídas, impede duplicações e permite retry após falha', async () => {
  let record = null, sends = 0, fail = false;
  const collection = {
    findOne: async () => record,
    findOneAndUpdate: async () => {
      if (record.adminEmail?.status === 'sending' || record.adminEmail?.status === 'sent') return null;
      record.adminEmail = {status: 'sending'}; return record;
    },
    updateOne: async (_filter, update) => {record.adminEmail.status = update.$set['adminEmail.status'];},
  };
  const {notifyRegistration} = load('../src/server/email/registration-notification.ts', {
    'server-only': {}, '@/server/registrations': {registrationDb: async () => ({collection: () => collection})},
    '@/emails/templates/new-registration': {newRegistrationEmail},
    './transport': {emailConfiguration: () => {}, sendTemplateEmail: async () => {sends++; if (fail) throw new Error('SMTP_FAILED'); return 'message-id';}},
  });
  assert.equal((await notifyRegistration('id')).status, 'not-found');
  record = {slug: 'pipas', submittedAt: new Date(), answers: {nome: 'Maria'}, kits: [], totalCents: 0, formSnapshot: {title: 'Pipas'}};
  fail = true;
  await assert.rejects(notifyRegistration('id'), /SMTP_FAILED/);
  assert.equal(record.adminEmail.status, 'failed');
  fail = false;
  assert.equal((await notifyRegistration('id')).status, 'sent');
  assert.equal((await notifyRegistration('id')).status, 'sent');
  assert.equal(sends, 2);
  record.adminEmail.status = 'sending';
  assert.equal((await notifyRegistration('id')).status, 'processing');
  assert.equal(sends, 2);
});
