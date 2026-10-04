const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/lib/registrations/security.ts');
const moduleUnderTest = new Module(filename);
moduleUnderTest._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText, filename);
const {matchesRequestOrigin, registrationCaptchaFailure} = moduleUnderTest.exports;

test('origem usa o host público preservando host, porta e protocolo', () => {
  assert.equal(matchesRequestOrigin('http://localhost:3001', 'http://localhost:3001/api', 'localhost:3001'), true);
  assert.equal(matchesRequestOrigin('http://127.0.0.1:3001', 'http://localhost:3001/api', '127.0.0.1:3001'), true);
  assert.equal(matchesRequestOrigin('http://evil.example', 'http://localhost:3001/api', 'localhost:3001'), false);
  assert.equal(matchesRequestOrigin('http://localhost:3002', 'http://localhost:3001/api', 'localhost:3001'), false);
  assert.equal(matchesRequestOrigin('https://localhost:3001', 'http://localhost:3001/api', 'localhost:3001'), false);
  assert.equal(matchesRequestOrigin(null, 'http://localhost:3001/api', 'localhost:3001'), false);
});
const valid = {success: true, hostname: 'localhost', action: 'inscricao', score: 0.9};
test('captcha válido em localhost é aceito; pontuação, ação e host continuam obrigatórios', () => {
  assert.equal(registrationCaptchaFailure(valid, 'localhost'), null);
  assert.equal(registrationCaptchaFailure({...valid, score: 0.5}, 'localhost'), null);
  assert.equal(registrationCaptchaFailure({...valid, score: 0.1}, 'localhost').code, 'RECAPTCHA_LOW_SCORE');
  assert.equal(registrationCaptchaFailure({...valid, score: undefined}, 'localhost').code, 'RECAPTCHA_SCORE_MISSING');
  assert.equal(registrationCaptchaFailure({...valid, score: NaN}, 'localhost').code, 'RECAPTCHA_SCORE_MISSING');
  assert.equal(registrationCaptchaFailure({...valid, hostname: 'example.com'}, 'localhost').code, 'RECAPTCHA_HOSTNAME');
  assert.equal(registrationCaptchaFailure({...valid, action: 'submit'}, 'localhost').code, 'RECAPTCHA_ACTION');
});
test('configuração inválida, token recusado e expiração são diferenciados', () => {
  assert.equal(registrationCaptchaFailure({success: false, 'error-codes': ['invalid-input-secret']}, 'localhost').status, 503);
  assert.equal(registrationCaptchaFailure({success: false, 'error-codes': ['timeout-or-duplicate']}, 'localhost').code, 'RECAPTCHA_EXPIRED');
  assert.equal(registrationCaptchaFailure({success: false, 'error-codes': ['invalid-input-response']}, 'localhost').code, 'RECAPTCHA_TOKEN');
});
