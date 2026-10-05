const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, dependencies = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, URL, process: { env: { URL_MONGO: 'mock' } },
    require: name => dependencies[name] || require(name) });
  return module.exports;
}
const model = load('src/lib/linktree/model.ts');
const profile = { name: 'Grupo', bio: 'Descrição', avatarUrl: '/logo/logo.png', links: [{ id: 1, label: 'Site', url: 'https://example.org' }] };
function api(role, authenticated = true, origin = true) {
  let writes = 0;
  const db = { collection: name => name === 'users'
    ? { findOne: async () => ({ nivelAcess: role }) }
    : { findOne: async () => ({ _id: 'profile', ...profile }), updateOne: async () => { writes++; return { matchedCount: 1 }; } } };
  class MongoClient { async connect() { return this; } db() { return db; } }
  class ObjectId { static isValid() { return true; } }
  const routes = load('src/app/api/linktree/route.ts', {
    'next/server': { NextResponse: { json: (body, options = {}) => ({ body, status: options.status || 200 }) } },
    mongodb: { MongoClient, ObjectId },
    '@/server/registrations': { registrationSession: () => authenticated ? { userId: 'user' } : null, sameOrigin: () => origin },
    '@/lib/linktree/model': model,
  });
  return { ...routes, writes: () => writes };
}
const request = (body = profile) => ({ json: async () => body, nextUrl: { searchParams: new URLSearchParams('admin=1') } });

test('somente Admin e Dirigente podem gravar', async () => {
  for (const role of ['Admin', 'Dirigente']) {
    const route = api(role);
    assert.equal((await route.PUT(request())).status, 200);
    assert.equal(route.writes(), 1);
  }
  for (const role of ['Escotista', 'Regional-admin', 'Diretoria', '']) {
    const route = api(role);
    assert.equal((await route.PUT(request())).status, 403);
    assert.equal((await route.GET(request())).status, 403);
    assert.equal(route.writes(), 0);
  }
});
test('sessão ausente ou origem diferente não podem gravar', async () => {
  for (const route of [api('Admin', false), api('Admin', true, false)]) {
    assert.equal((await route.PUT(request())).status, 403);
    assert.equal(route.writes(), 0);
  }
});
test('links inválidos e IDs duplicados são rejeitados sem gravar', async () => {
  for (const links of [
    [{ id: 1, label: 'Link', url: 'javascript:alert(1)' }],
    [{ id: 1, label: '', url: 'https://example.org' }],
    [profile.links[0], profile.links[0]],
    [{ id: 1, label: 'Link', url: '//example.org' }],
  ]) {
    const route = api('Admin');
    assert.equal((await route.PUT(request({ ...profile, links }))).status, 400);
    assert.equal(route.writes(), 0);
  }
});
test('incluir e remover links preserva dados do perfil', () => {
  const added = model.validateLinktree({ ...profile, links: [...profile.links, { id: 'new', label: 'Projeto', url: '/projetos' }] });
  assert.equal(added.links.length, 2);
  const removed = model.validateLinktree({ ...added, links: [] });
  assert.equal(removed.links.length, 0);
  assert.equal(removed.name, profile.name);
});
