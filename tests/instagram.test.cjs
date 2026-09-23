const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const DAY = 86400000;

function harness({record, response, busy = false} = {}) {
    let current = record;
    let calls = 0;
    const collection = {
        async findOne() { return current; },
        async findOneAndUpdate(filter, update) {
            if (busy) return null;
            Object.assign(current, update.$set);
            return {...current};
        },
        async updateOne(filter, update) {
            if (filter.lockId && current.lockId !== filter.lockId) return {matchedCount: 0};
            if (!current && update.$setOnInsert) current = {_id: 'instagram', ...update.$setOnInsert};
            if (update.$set) Object.assign(current, update.$set);
            for (const key of Object.keys(update.$unset || {})) delete current[key];
            return {matchedCount: 1};
        },
    };
    const env = {URL_MONGO: 'mock', TOKEN_INSTA: 'seed', INSTAGRAM_TOKEN_ENCRYPTION_KEY: 'ab'.repeat(32), CRON_SECRET: 'test-secret'};
    const context = {
        exports: {}, Buffer, URL, AbortSignal, console, process: {env},
        fetch: async () => { calls++; return response; },
        require(name) {
            if (name === 'server-only') return {};
            if (name === 'mongodb') return {MongoClient: class {
                async connect() { return this; }
                db() { return {collection: () => collection}; }
            }};
            return require(name);
        },
    };
    const source = fs.readFileSync(path.join(__dirname, '../src/server/instagram.ts'), 'utf8');
    vm.runInNewContext(ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText, context);
    return {api: context.exports, context, get record() {return current;}, get calls() {return calls;}};
}

test('criptografia autenticada oculta o token e rejeita alterações', () => {
    const h = harness();
    const encrypted = h.api.encryptToken('secret-token');
    assert.ok(!encrypted.includes('secret-token'));
    assert.equal(h.api.decryptToken(encrypted), 'secret-token');
    const parts = encrypted.split('.');
    parts[1] = Buffer.alloc(16).toString('base64');
    assert.throws(() => h.api.decryptToken(parts.join('.')));
});
test('janela de renovação: 24h mínimas e 15 dias antes do vencimento', () => {
    const h = harness(), now = Date.now();
    assert.equal(h.api.renewalDue({initializedAt: new Date(now)}, now), false);
    assert.equal(h.api.renewalDue({initializedAt: new Date(now - 2*DAY)}, now), true);
    assert.equal(h.api.renewalDue({initializedAt: new Date(now - 2*DAY), expiresAt: new Date(now + 16*DAY)}, now), false);
    assert.equal(h.api.renewalDue({initializedAt: new Date(now - 2*DAY), expiresAt: new Date(now + 15*DAY)}, now), true);
});
test('inicializa uma vez e não renova token recém-gerado', async () => {
    const h = harness();
    assert.equal((await h.api.refreshInstagramToken()).status, 'not_due');
    assert.equal(h.calls, 0);
    assert.equal(await h.api.instagramAccessToken(), 'seed');
});
async function dueHarness(options = {}) {
    const h = harness(options);
    await h.api.instagramAccessToken();
    h.record.initializedAt = new Date(Date.now() - 2*DAY);
    return h;
}
test('renova, persiste token retornado e usa-o no feed', async () => {
    const h = await dueHarness({response: {ok: true, json: async () => ({access_token: 'renewed', expires_in: 5184000})}});
    assert.equal((await h.api.refreshInstagramToken()).status, 'renewed');
    assert.equal(await h.api.instagramAccessToken(), 'renewed');
    assert.equal((await h.api.refreshInstagramToken()).status, 'not_due');
    assert.equal(h.calls, 1);
    assert.equal(h.record.lockId, undefined);
});
test('falha da Meta preserva token, libera trava e permite nova tentativa', async () => {
    const h = await dueHarness({response: {ok: false}});
    await assert.rejects(h.api.refreshInstagramToken(), /Não foi possível/);
    assert.equal(await h.api.instagramAccessToken(), 'seed');
    assert.ok(h.record.lastFailureAt);
    assert.equal(h.record.lockId, undefined);
    await assert.rejects(h.api.refreshInstagramToken());
    assert.equal(h.calls, 2);
});
test('execução concorrente não chama Meta', async () => {
    const h = await dueHarness({busy: true});
    assert.equal((await h.api.refreshInstagramToken()).status, 'busy');
    assert.equal(h.calls, 0);
});
test('resposta inválida não substitui o token', async () => {
    const h = await dueHarness({response: {ok: true, json: async () => ({access_token: 'bad', expires_in: -1})}});
    await assert.rejects(h.api.refreshInstagramToken());
    assert.equal(await h.api.instagramAccessToken(), 'seed');
});
test('cron rejeita segredo ausente/incorreto antes de executar', async () => {
    let called = 0;
    const context = {exports: {}, Buffer, Response, console, process: {env: {}}, require(name) {
        if (name === '@/server/instagram') return {refreshInstagramToken: async () => {called++; return {status: 'not_due'};}};
        return require(name);
    }};
    const source = fs.readFileSync(path.join(__dirname, '../src/app/api/cron/instagram/route.ts'), 'utf8');
    vm.runInNewContext(ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText, context);
    assert.equal((await context.exports.GET(new Request('https://example.test'))).status, 401);
    context.process.env.CRON_SECRET = 'secret';
    assert.equal((await context.exports.GET(new Request('https://example.test', {headers: {Authorization: 'Bearer invalid'}}))).status, 401);
    assert.equal(called, 0);
    assert.equal((await context.exports.GET(new Request('https://example.test', {headers: {Authorization: 'Bearer secret'}}))).status, 200);
    assert.equal(called, 1);
});
