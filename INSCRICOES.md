# Inscrições reutilizáveis

Páginas públicas: `/inscricoes` e `/inscricoes/[slug]`.
Administração: entre em `/administrativo`, como **Admin** ou **Dirigente**, e abra **Formulários de inscrição** em `/administrativo/area-restrita`.

## Ativar em produção

1. Publique as alterações do site e de `server-coqueiral` (Railway). O endpoint novo é `POST /inscricoes`. A implantação não é feita por estes arquivos.
2. Configure **o mesmo `INSCRICOES_SECRET` privado, com pelo menos 32 caracteres**, nos dois serviços. Uma chave foi gerada nos arquivos locais `.env.local` e `.env`, ignorados pelo Git. Copie essa configuração para o ambiente de cada hospedagem, sem colocar em `next.config.ts`, `NEXT_PUBLIC_*`, commits ou mensagens.
3. Ambos os serviços precisam apontar `URL_MONGO` para o mesmo banco. As coleções `registrationForms` e `registrations` ficam no banco `site-coqueiral`.
4. No site, mantenha `URL_UPLOAD` com a URL pública do servidor externo, `RECAPTCHA_KEY_SITE` e `RECATCHA_SECRET_KEY` (nome legado já existente; também são aceitos `RECAPTCHA_SECRET_KEY`, `RECAPTCHA_KEY_SECRET` e `RECAPTCHA_SECRET`). Cadastre o domínio no reCAPTCHA v3. A ação verificada é `inscricao`.
5. No servidor externo, mantenha as credenciais Google já usadas pela função `autenticateDrive`. Configure `ORIGIN` para a origem exata do site. O CORS existente aceita também `http://localhost:3001`; para testes com `127.0.0.1`, configure `ORIGIN=http://127.0.0.1:3001` no ambiente local.
6. Entre novamente no administrativo após configurar a chave. O login existente passa a emitir uma sessão HTTP-only assinada, válida por oito horas, para essas operações. O token público legado não dá acesso às novas APIs administrativas.
7. Clique **Usar modelo Festival de Pipas**, confira orientações e pagamento e salve. A pasta raiz padrão é `1U6bQrAscHz_oso-vQAdE4TdeCjSNQh7G`. Para substituir somente nesse formulário, altere **ID da pasta raiz do Google Drive**; vazio usa o padrão. O modelo começa fechado. Depois, clique **Abrir inscrições**.

Os dados do modelo foram adaptados do [Google Forms fornecido](https://docs.google.com/forms/d/e/1FAIpQLScU8TUavO2tXlVDdnPAS-sEyLT5qYmsi8uQkBEwF8oA3uZ0qQ/viewform). Preços: Kit 01 R$ 15, Kit 02 R$ 8, pipa pronta R$ 8, linha R$ 5, rabiola R$ 2. Cada item aceita quantidade de 0 a 100 (limite configurável). A soma usa centavos inteiros e é calculada novamente no servidor. Não foi inventada uma chave Pix; inclua os dados reais nas orientações administrativas.

## Google Drive

Use uma pasta em um **Drive compartilhado** em que a conta de serviço possa criar arquivos. Contas de serviço não têm cota de armazenamento própria; uma pasta compartilhada do “Meu Drive” pode exigir autenticação com delegação/OAuth, em vez das credenciais atuais. A integração mantém a autenticação existente e usa `supportsAllDrives`.

O padrão está na constante `DEFAULT_REGISTRATION_DRIVE_ROOT`, em `src/lib/registrations/model.ts`, com cópia sincronizada no servidor em `src/scripts/registration-model.ts`. Novos formulários já começam com esse ID; um valor manual tem prioridade. Destinos existentes preenchidos são preservados.

A organização no Drive é **pasta raiz → pasta do formulário (slug) → pasta da inscrição (protocolo)**. A pasta do formulário é criada no primeiro envio e reutilizada nos seguintes. Cada inscrição contém comprovantes privados e `inscricao.json` com respostas, quantidades, preços, total e data. O sistema não torna arquivos públicos e não confirma pagamentos automaticamente. Consulte a raiz pelo link **Ver inscrições no Drive** na administração. Preserve as permissões restritas da pasta de destino. Trocar a raiz direciona os próximos envios à nova pasta, sem mover arquivos já recebidos.

Referências oficiais: [uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads), [contas de serviço e armazenamento](https://developers.google.com/workspace/drive/api/guides/about-shareddrives), [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3).

## Funcionamento

- Cadastros permitem título, descrição, orientações, campos de texto/e-mail/telefone/texto longo/seleção, kits, preços e limites, obrigatoriedade de comprovante e flag `open`.
- Até 5 anexos, até 10 MB cada; PDF, JPEG, PNG e WebP. O servidor verifica MIME e assinatura do conteúdo. Documentos Word não são aceitos porque o pedido limita o upload a PDF e imagens.
- O site emite uma autorização assinada de 30 minutos após validar reCAPTCHA, respostas e versão do formulário. Os arquivos vão diretamente ao servidor externo; nenhum segredo do Drive vai para o navegador.
- O backend consulta a flag e a revisão antes de aceitar o envio e antes de confirmá-lo. Alterações após abrir a página exigem atualização. Fechamento não apaga inscrições recebidas.
- Reenvio do mesmo ticket é idempotente: se a resposta se perder, use **Enviar inscrição** novamente sem editar os campos. Durante processamento, o backend informa que é preciso aguardar. Depois de editar campos ou anexos, o site prepara outro protocolo.
- Em falhas, a pasta incompleta vai para a lixeira e arquivos temporários são removidos. Se a limpeza falhar, o registro recebe `cleanup-required`, com ID da pasta, e bloqueia nova tentativa para evitar duplicação. Se o processo do servidor for interrompido, registros `processing` exigem revisão operacional; não há confirmação automática de sucesso.
- A edição usa controle de revisão para impedir sobrescrever alterações de outro administrador. O endereço fica fixo depois de criar. Formulários fechados continuam visíveis na listagem pública.

## Validação e manutenção

Para investigar um 403 em `/api/inscricoes/autorizar`, abra a resposta JSON na aba Rede do navegador. `RECAPTCHA_TOKEN` indica token recusado pelo Google; `RECAPTCHA_EXPIRED`, token expirado ou repetido; `RECAPTCHA_HOSTNAME`, domínio divergente; `RECAPTCHA_ACTION`, ação divergente; `RECAPTCHA_SCORE_MISSING`, ausência de pontuação v3; `RECAPTCHA_LOW_SCORE`, pontuação inferior a 0,5. `RECAPTCHA_CONFIGURATION` retorna 503 para chave secreta ausente/inválida. Em desenvolvimento, `diagnostics` mostra a pontuação, ação, domínio e códigos do Google, sem credenciais ou token. Esses mesmos dados são registrados no terminal do servidor. A presença do selo no navegador não confirma a aprovação da verificação. Não há bypass em localhost.

`npm run build` em ambos os projetos. No servidor: `node --test tests/registrations.test.cjs` depois do build. Os testes HTTP usam Mongo/Drive simulados e arquivos sintéticos, sem transmitir dados externos.

O contrato de validação é compartilhado por cópia: `site-coqueiral/src/lib/registrations/model.ts` e `server-coqueiral/src/scripts/registration-model.ts`. Ao alterar esse contrato, sincronize os dois arquivos e execute os testes. Cada serviço continua podendo ser publicado separadamente.

A autenticação existente do Drive foi validada localmente. Neste Windows, o Node precisou de `--use-system-ca` para confiar na cadeia de certificados do sistema; mantenha a verificação TLS ativa. A chave reCAPTCHA atual recusa localhost, por isso os testes de envio usam serviços simulados. Configure um domínio de desenvolvimento permitido para testar reCAPTCHA real.

Para QA visual sem cadastros em banco: com o site rodando na porta 3001, execute `node tests/registration-preview.cjs` no projeto do site e abra `http://127.0.0.1:3015/inscricoes/festival-de-pipas-2026`. Essa prévia usa o modelo aberto somente em memória e bloqueia a autorização de envio; não é uma página de produção.
# Protocolos de inscrição

## Consulta no acesso restrito

Em `/administrativo/area-restrita`, a ferramenta **Inscrições recebidas** está disponível para qualquer usuário autenticado, independentemente de seu nível de acesso. Ela lista apenas inscrições concluídas, com filtro por formulário, busca por nome ou protocolo e páginas de 25 registros. Os detalhes incluem respostas, quantidades dos kits, total, anexos e link da pasta no Drive.

A API `/api/inscricoes/recebidas` valida o cookie assinado de sessão, sua expiração e a existência do usuário no banco. Não aceita o perfil armazenado no navegador como autorização. Se a sessão expirar ou o usuário já estava conectado antes da implantação da sessão assinada, é necessário entrar novamente. A configuração de formulários continua exclusiva de Admin e Dirigente.

A listagem consulta o MongoDB; JSON e anexos continuam armazenados no Drive. Novas inscrições também salvam no banco o título e os rótulos dos campos usados no envio. Inscrições anteriores usam os dados atuais do formulário. Os links de anexos respeitam as permissões existentes do Google Drive; esta funcionalidade não torna arquivos públicos.

Validação: `node --test tests/received-registrations.test.cjs tests/registration-protocol.test.cjs tests/registration-security.test.cjs` no site e `npm run test:registrations` no servidor.

Novas inscrições recebem um protocolo público de oito caracteres alfanuméricos, como `K7M4-9R2X`. A geração usa aleatoriedade criptográfica e evita `O`, `0`, `I` e `1`. O UUID continua sendo o identificador interno dos tickets e dos registros.

O site cria automaticamente um índice MongoDB único e esparso em `registrations.protocol`. Se o banco recusar a inserção por colisão nesse campo, gera outro protocolo, até dez tentativas. Outros erros de banco são propagados. Registros antigos sem esse campo mantêm o UUID como protocolo de confirmação.

O servidor retorna o mesmo protocolo ao concluir ou repetir um envio e inclui o campo no `inscricao.json` do Drive. Publique as alterações do site e do servidor para ativar o fluxo completo. Não há variável de ambiente adicional.
