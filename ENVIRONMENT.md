# Variáveis de ambiente

As referências do site e do backend Express agora usam os nomes sem `NEXT_PUBLIC_`. Os arquivos `.env*` locais foram renomeados preservando os valores. Antes de publicar, renomeie as mesmas chaves nos provedores de hospedagem e refaça o build do site.

## Navegador

O `env` de `next.config.ts` contém uma lista explícita das configurações usadas no navegador: `ROOT_URL`, `SITE_URL`, `URL_SERVICES`, `URL_AUTH`, `URL_UPLOAD`, `API_KEY_GOOGLE` e `RECAPTCHA_KEY_SITE`. Esses valores são públicos e incorporados durante o build.

Por compatibilidade, os fluxos existentes também usam `AUTORIZATION`, `TOKEN_APP` e `PASSWORD` no cliente. Eles já eram públicos antes da renomeação e continuam públicos. Remover essa exposição exige uma migração separada da autenticação, da criptografia no cliente e dos dados de treinamento administrativo; não se deve tratar esses valores como segredos protegidos.

## Somente servidor 

Configure diretamente no ambiente de execução, nunca em `next.config.env`: `URL_MONGO`, `PASS_EMAIL`, `RECATCHA_SECRET_KEY`, `TOKEN_INSTA`, `INSTAGRAM_API_URL`, `TYPE`, `PROJECT_ID`, `PRIVATE_KEY_ID`, `PRIVATE_KEY`, `CLIENT_EMAIL`, `CLIENT_ID`, `AUTH_URI`, `TOKEN_URI`, `AUTH_PROVIDER`, `CLIENT_CERT` e `UNIVERSE_DOMAIN`. O Next.js já disponibiliza essas variáveis via `process.env` no servidor.

No backend Express, também foram renomeadas as referências de `AUTORIZATION`, `URL_MONGO`, credenciais Google Cloud e `GPT_API_KEY`. A integração antiga de IA não foi removida nesta alteração. `PORT` e `ORIGIN` continuam com os mesmos nomes. O Express precisa de suas próprias variáveis; ele não lê o `next.config.ts`.

Documentação: https://nextjs.org/docs/app/api-reference/config/next-config-js/env
