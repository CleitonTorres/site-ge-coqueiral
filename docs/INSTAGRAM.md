# Renovação automática do Instagram

O feed continua consultando /api/services. O servidor passa a usar o token criptografado da coleção integration_tokens, banco site-coqueiral. Nenhum token é retornado ao navegador.

## Ativação na Vercel

Configure no ambiente de **Production**:
- TOKEN_INSTA: token válido de longa duração da API com Instagram Login (graph.instagram.com). O token do Graph API Explorer/Facebook Login não é intercambiável com esse fluxo.
- INSTAGRAM_API_URL: https://graph.instagram.com
- URL_MONGO: conexão com acesso de leitura/escrita ao banco site-coqueiral.
- INSTAGRAM_TOKEN_ENCRYPTION_KEY: chave exclusiva de 32 bytes em hexadecimal (64 caracteres).
- CRON_SECRET: segredo aleatório exclusivo para autenticar o agendamento.

Gere cada segredo separadamente com `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` e guarde os valores somente nas variáveis do servidor. Não adicione ao next.config.env nem use NEXT_PUBLIC_. Guarde a chave de criptografia: sua troca torna o token armazenado ilegível.

Faça um deploy de produção. O vercel.json agenda GET /api/cron/instagram diariamente às 09:00 UTC (06:00 em Brasília; a execução pode ocorrer dentro da janela permitida pelo plano). Em Settings → Cron Jobs, use Run para inicializar e confira os logs. O endpoint exige Authorization: Bearer CRON_SECRET, inclusive em testes manuais. Não coloque o segredo na URL.

## Funcionamento

- A primeira consulta ou execução inicializa o registro com TOKEN_INSTA.
- Aguarda ao menos 24 horas após inicializar, pois tokens novos não devem ser renovados imediatamente. Na próxima execução elegível, descobre a validade pela resposta da Meta.
- Depois renova quando faltarem 15 dias ou menos, usando expires_in retornado pela Meta.
- Salva o token retornado com AES-256-GCM. Um bloqueio com prazo evita renovações concorrentes.
- Se falhar, mantém o token anterior, registra lastFailureAt e retorna HTTP 503. A execução do dia seguinte tenta novamente. Configure monitoramento dos erros da função na hospedagem; não há envio de alertas por e-mail.
- Token expirado/revogado requer nova autorização. Substitua TOKEN_INSTA e faça novo deploy para reinicializar. Espere a retirada de deployments antigos antes de executar novamente: ambientes com seeds diferentes não devem compartilhar o registro.
- Use banco separado para Preview/desenvolvimento se habilitar a chave nesses ambientes; evita que um token de teste substitua o de produção.
- Sem INSTAGRAM_TOKEN_ENCRYPTION_KEY o feed mantém a leitura legada de TOKEN_INSTA, mas o cron falha e a renovação automática não está ativa.

Não é necessário modificar o componente InstagramFeed. A tarefa é independente do tráfego da home. Fora da Vercel, configure um agendador externo para chamar diariamente o mesmo endpoint com o cabeçalho de autorização.

Referências: https://developers.facebook.com/docs/instagram-platform/reference/refresh_access_token/ e https://vercel.com/docs/cron-jobs/manage-cron-jobs
