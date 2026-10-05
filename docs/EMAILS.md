# E-mails de inscrições

O Nodemailer já estava instalado no site e foi reaproveitado. A API `POST /api/emails` roda no runtime Node do Next. O template inicial está em `src/emails/templates/new-registration.ts`, com versões HTML e texto, sem anexos.

## Configuração Gmail no Next

Copie `.env.email.example` para seu `.env.local` sem substituir as outras variáveis e configure os mesmos valores na hospedagem do site:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=sua-conta@gmail.com
SMTP_PASSWORD=senha-de-app
EMAIL_FROM="Coqueiral <sua-conta@gmail.com>"
REGISTRATION_ADMIN_EMAILS=administracao@example.com,diretoria@example.com
EMAIL_SITE_URL=https://www.grupoescoteirocoqueiral.org.br
```

Use uma senha de app da conta Gmail com verificação em duas etapas, conforme [documentação do Nodemailer](https://nodemailer.com/guides/using-gmail) e [Ajuda do Google](https://support.google.com/mail/answer/185833?hl=pt-BR). Use no remetente a conta autenticada ou um alias autorizado. Não use a senha comum da conta e não prefixe estas variáveis com `NEXT_PUBLIC`.

## Configuração no Railway

```dotenv
REGISTRATION_EMAIL_API_URL=https://www.grupoescoteirocoqueiral.org.br/api/emails
```

O Railway e o Next precisam manter o mesmo `INSCRICOES_SECRET`. Para desenvolvimento local, use `http://localhost:3001/api/emails` quando os dois serviços rodam na mesma máquina. Publique primeiro o site com a API e depois o servidor. Nenhuma credencial SMTP precisa ficar no Railway.

## Fluxo e falhas

Após completar os uploads e confirmar a inscrição no MongoDB, o Railway aguarda a chamada à API do Next com um token assinado de escopo `registration-email`, válido por cinco minutos. O Next busca a inscrição concluída; não aceita destinatários, HTML ou dados pessoais enviados pelo cliente. Os destinatários vêm exclusivamente do ambiente e ficam em cópia oculta.

O campo `registrations.adminEmail` registra a tentativa (`sending`, `sent` ou `failed`), datas e identificador SMTP. Uma atualização atômica evita envios concorrentes. Uma inscrição já notificada não é enviada novamente. Repetir o envio da inscrição com seu ticket ainda válido também tenta novamente a notificação se ela falhou. Tentativas interrompidas podem ser recuperadas após cinco minutos, por uma nova chamada privada assinada; não há scheduler automático nesta primeira versão.

Falhar no e-mail não desfaz nem invalida a inscrição. O log do Railway informa o problema. Uma resposta SMTP aceita indica aceitação pelo provedor, não confirmação de entrega na caixa de entrada. Se o SMTP aceitar e a gravação final no MongoDB falhar, uma repetição pode duplicar a mensagem; SMTP e MongoDB não oferecem uma transação conjunta.

Sem credenciais configuradas, não são enviados e-mails. As inscrições antigas não são notificadas em lote. Testes usam transporte simulado, sem enviar e-mails reais:

```sh
node --test tests/registration-email.test.cjs
```
