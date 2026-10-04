const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/server/registration-protocol.ts');
const loaded = new Module(filename);
loaded._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText, filename);
const {generateRegistrationProtocol, insertRegistrationWithProtocol} = loaded.exports;

test('protocolo tem oito caracteres legíveis separados em dois grupos', () => {
  for (let i = 0; i < 100; i++) assert.match(generateRegistrationProtocol(), /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
});

test('colisão detectada no insert gera outro protocolo preservando UUID', async () => {
  const stored = [];
  let attempt = 0;
  const collection = {
    createIndex: async (keys, options) => {
      assert.deepEqual(keys, {protocol: 1});
      assert.deepEqual(options, {unique: true, sparse: true});
    },
    insertOne: async doc => {
      if (++attempt === 1) throw {code: 11000, keyPattern: {protocol: 1}};
      stored.push(doc);
    },
  };
  const codes = ['ABCD-2345', 'EFGH-6789'];
  assert.equal(await insertRegistrationWithProtocol(collection, {registrationId: 'internal-uuid'}, () => codes.shift()), 'EFGH-6789');
  assert.deepEqual(stored, [{registrationId: 'internal-uuid', protocol: 'EFGH-6789'}]);
});

test('falhas do banco e duplicação do UUID não são tratadas como colisão de protocolo', async () => {
  for (const failure of [new Error('offline'), {code: 11000, keyPattern: {registrationId: 1}}]) {
    let attempts = 0;
    await assert.rejects(insertRegistrationWithProtocol({createIndex: async () => {}, insertOne: async () => {attempts++; throw failure;}}, {}), error => error === failure);
    assert.equal(attempts, 1);
  }
});

test('colisões persistentes encerram tentativas sem inserir inscrição', async () => {
  let attempts = 0;
  await assert.rejects(insertRegistrationWithProtocol({createIndex: async () => {}, insertOne: async () => {attempts++; throw {code: 11000, keyPattern: {protocol: 1}};}}, {}), /protocolo único/);
  assert.equal(attempts, 10);
});
