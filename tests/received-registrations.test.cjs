const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const {ObjectId} = require('mongodb');
function load(relative, mocks) {
  const filename = path.resolve(__dirname, relative);
  const loaded = new Module(filename);
  loaded.paths = module.paths;
  const original = loaded.require.bind(loaded);
  loaded.require = name => name in mocks ? mocks[name] : original(name);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText, filename);
  return loaded.exports;
}
const security = load('../src/server/registrations.ts', {'server-only': {}, '@/lib/registrations/security': {}});
test('sessão assinada permite consulta por membro, sem liberar configuração administrativa', () => {
  const previous = process.env.INSCRICOES_SECRET;
  process.env.INSCRICOES_SECRET = 'test-only-secret-12345678901234567890';
  try {
    const payload = {scope: 'admin', userId: new ObjectId().toString(), role: 'Membro', expires: Date.now() + 60000};
    const request = token => ({cookies: {get: () => ({value: token})}});
    const token = security.signRegistrationToken(payload);
    assert.equal(security.registrationSession(request(token)).userId, payload.userId);
    assert.equal(security.registrationAdmin(request(token)), false);
    assert.equal(security.registrationAdmin(request(security.signRegistrationToken({...payload, role: 'Admin'}))), true);
    assert.equal(security.registrationSession(request(`${token}x`)), null);
    assert.equal(security.registrationSession(request(security.signRegistrationToken({...payload, expires: 0}))), null);
  } finally {if (previous === undefined) delete process.env.INSCRICOES_SECRET; else process.env.INSCRICOES_SECRET = previous;}
});

test('consulta exige usuário existente, filtra concluídas e preserva snapshot e paginação', async () => {
  let exists = true, dbCalls = 0, receivedFilter, projection, skipped, limit;
  const cursor = {sort() {return this;}, skip(value) {skipped = value; return this;}, limit(value) {limit = value; return this;}, maxTimeMS() {return this;}, async toArray() {return [{registrationId: 'uuid', slug: 'festival', formSnapshot: {title: 'Título original', fields: []}}];}};
  const {GET} = load('../src/app/api/inscricoes/recebidas/route.ts', {
    'next/server': {NextResponse: {json: (data, options = {}) => ({data, status: options.status || 200, headers: options.headers})}},
    '@/server/registrations': {
      registrationSession: req => req.session,
      registrationDb: async () => {dbCalls++; return {collection: name => name === 'users' ? {findOne: async () => exists ? {_id: 'user'} : null} : name === 'registrationForms' ? {find: () => ({maxTimeMS() {return this;}, toArray: async () => [{slug: 'festival', title: 'Título atual', fields: []}]})} : {
        find: (filter, options) => {receivedFilter = filter; projection = options.projection; return cursor;}, countDocuments: async () => 30, distinct: async () => ['festival'],
      }};},
    },
  });
  const req = (session, query = '') => ({session, nextUrl: new URL(`http://localhost/api?${query}`)});
  assert.equal((await GET(req(null))).status, 401);
  assert.equal(dbCalls, 0);
  const session = {userId: new ObjectId().toString(), role: 'Membro'};
  exists = false;
  assert.equal((await GET(req(session))).status, 401);
  exists = true;
  const response = await GET(req(session, 'page=2&slug=festival&search=A.*'));
  assert.equal(response.status, 200);
  assert.equal(response.headers['Cache-Control'], 'private, no-store');
  assert.equal(receivedFilter.status, 'completed');
  assert.equal(receivedFilter.slug, 'festival');
  assert.equal(receivedFilter.$or[0].protocol.$regex, 'A\\.\\*');
  assert.equal(projection._id, 0);
  assert.equal(skipped, 25); assert.equal(limit, 25);
  assert.equal(response.data.registrations[0].form.title, 'Título original');
  assert.equal(response.data.total, 30);
});
