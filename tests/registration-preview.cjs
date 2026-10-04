// Visual QA fixture. No MongoDB, Google Drive or real submissions are used.
// Run alongside `npm run dev`: node tests/registration-preview.cjs
const http = require('node:http');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const path = require('node:path');
const filename = path.resolve(__dirname, '../src/lib/registrations/model.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
const model = new Module(filename); model._compile(compiled, filename);
const fixture = model.exports.publicForm({...model.exports.festivalTemplate, open: true, revision: 'visual-fixture'});
http.createServer((req, res) => {
  if (req.url.startsWith('/api/inscricoes/formularios')) {
    res.writeHead(200, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
    res.end(JSON.stringify({forms: [fixture]})); return;
  }
  if (req.url.startsWith('/api/inscricoes/autorizar')) {
    res.writeHead(503, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Prévia de layout: nenhum dado é enviado.'})); return;
  }
  const proxy = http.request({hostname: '127.0.0.1', port: 3001, path: req.url, method: req.method, headers: {...req.headers, host: '127.0.0.1:3001'}}, response => {
    res.writeHead(response.statusCode, response.headers); response.pipe(res);
  });
  proxy.on('error', () => {res.writeHead(502); res.end('Inicie o site em http://127.0.0.1:3001.');});
  req.pipe(proxy);
}).listen(3015, '127.0.0.1', () => console.log('Prévia isolada: http://127.0.0.1:3015/inscricoes/festival-de-pipas-2026'));
