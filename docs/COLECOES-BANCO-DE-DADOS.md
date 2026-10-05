# Coleções do banco de dados — Site Coqueiral

Atualizado em 5 de outubro de 2026. Banco: `site-coqueiral`.

Este documento descreve as cinco coleções apresentadas na imagem, com base no código atual do site e do servidor de arquivos. Não foi realizada consulta aos registros do banco em produção. Os campos abaixo representam a estrutura utilizada pela aplicação; registros antigos podem ter diferenças.

## Visão geral

| Coleção | Finalidade | Unidade de armazenamento |
| `news`  | Publicar notícias e eventos do grupo. | Uma notícia ou um evento. |
| `users` | Manter os usuários associados, seus perfis e credenciais de acesso. | Um usuário. |
| `registrationForms` | Configurar os formulários de inscrição em atividades e eventos. | Um formulário. |
| `registrations` | Registrar respostas, kits, valores, comprovantes e andamento das inscrições. | Uma tentativa de inscrição, que pode ser concluída. |
| `integration_tokens` | Persistir credenciais e controlar a renovação da integração com o Instagram. | Atualmente, um registro identificado por `instagram`. |

## 1. news — Notícias e eventos

Armazena o conteúdo publicado pelo grupo. A mesma coleção atende notícias e eventos: `evento: true` identifica um evento; quando o campo é falso ou ausente, o conteúdo é tratado como notícia.

É utilizada na página inicial, nas listagens “Aconteceu” e “Eventos”, na página individual de cada publicação e na geração do sitemap. A área administrativa insere publicações, e a API permite consultar todas ou localizar uma pelo `slug`.

| Campo | Uso |
| `_id` | Identificador do documento no MongoDB. |
| `title` | Título da publicação. |
| `paragraph` | Texto do conteúdo. |
| `imageID` | Lista de referências das imagens utilizadas na publicação. |
| `destaque` | Indicador de destaque. |
| `date` | Data da publicação/evento, conforme o conteúdo cadastrado. |
| `evento` | Diferencia evento de notícia. |
| `linkMaps` | Link de localização no mapa. |
| `keywords` | Palavras-chave da publicação. |
| `slug` | Endereço textual usado para localizar e abrir a publicação. |

Referências: `site-coqueiral/src/@types/types.tsx`, `src/app/api/services/route.tsx`, `src/components/layout/newsListing/newsListing.tsx` e `src/app/sitemap.tsx`.

## 2. users — Usuários associados

Mantém os dados dos usuários associados e as contas de acesso à área restrita. O login procura o documento pelo campo `user` e verifica a senha armazenada. O cadastro verifica se o nome de usuário já existe antes de inserir uma nova conta.

O campo `nivelAcess` define o perfil de acesso. No módulo de inscrições, os perfis `Admin` e `Dirigente` podem administrar formulários e consultar inscrições recebidas. A consulta de inscrições também verifica se o usuário da sessão ainda existe nesta coleção.

| Campo ou grupo | Uso |
| --- | --- |
| `_id` | Identificador do usuário no MongoDB. |
| `name`, `registro` | Nome e registro escoteiro. |
| `cargo`, `ramo`, `nivelFormacao` | Informações de atuação e formação. |
| `tel`, `email` | Contatos. |
| `nivelAcess` | Perfil: Escotista, Dirigente, Admin, Tester ou Regional-admin. |
| `user` | Nome utilizado no login. |
| `password` | Senha armazenada com a criptografia utilizada pelo código atual. |
| `dadosUel` | Dados da unidade escoteira: presidente, registro e telefone do presidente, número, nome, cidade e UF. |

O tipo de perfil também declara `token` e `expires` como opcionais; isso não significa que estejam presentes em todos os documentos. A sessão administrativa das inscrições é mantida em cookie assinado, separado da coleção `integration_tokens`.

Referências: `site-coqueiral/src/@types/types.tsx`, `src/app/api/auth/route.tsx`, `src/server/registrations.ts` e `src/app/api/inscricoes/recebidas/route.ts`.

## 3. registrationForms — Configuração dos formulários

Guarda a definição de cada formulário de inscrição: textos, perguntas, produtos/kits, preços, regras de anexos e abertura das inscrições. Não guarda as respostas dos participantes.

A administração cria e edita formulários. A consulta pública fornece os dados necessários à exibição do formulário, removendo `driveFolderId`. O site também consulta esta coleção para mostrar formulários abertos.

| Campo | Uso |
| `_id` | Identificador do documento. |
| `slug` | Identificador público do formulário; possui índice único criado pela aplicação. |
| `title`, `description`, `instructions` | Título, descrição e orientações ao participante. |
| `open` | Define se novas inscrições são permitidas. |
| `driveFolderId` | Pasta raiz do Google Drive destinada aos arquivos do formulário. |
| `fields` | Perguntas: `id`, `label`, `type`, `required` e, para seleção, `options`. |
| `kits` | Itens oferecidos: `id`, `name`, `description`, `priceCents` e `maxQuantity`. |
| `maxFiles`, `maxFileSizeMB`, `filesRequired` | Quantidade máxima, tamanho máximo por arquivo e obrigatoriedade dos anexos. |
| `revision` | Versão gerada a cada gravação, usada para evitar edição concorrente e envio com configuração desatualizada. |

Os tipos de pergunta são texto, e-mail, telefone, texto longo e seleção. A validação admite de 1 a 30 perguntas, até 30 kits e até 5 anexos de até 10 MB cada. `maxQuantity` limita a quantidade de um kit por inscrição; o código não o utiliza como controle de estoque global.

Existe no código um modelo para o Festival de Pipas de 2026. Sua presença no código não comprova que o formulário esteja cadastrado ou aberto no banco.

Referências: `site-coqueiral/src/lib/registrations/model.ts`, `src/app/api/inscricoes/formularios/route.ts`, `src/components/layout/openRegistrations/openRegistrations.tsx` e `server-coqueiral/src/scripts/registration-model.ts`.

## 4. registrations — Inscrições recebidas e em andamento

Armazena os dados de cada inscrição desde a autorização de envio até sua conclusão ou falha. O registro é criado antes do upload dos comprovantes; portanto, nem todo documento representa uma inscrição concluída.

| Campo | Uso |
| --- | --- |
| `_id` | Identificador interno do documento. |
| `registrationId` | UUID da inscrição; possui índice único criado pela aplicação. |
| `protocol` | Protocolo apresentado ao participante; possui índice único e esparso. |
| `slug`, `revision` | Formulário e versão utilizados na autorização. |
| `answers` | Respostas organizadas pelos identificadores das perguntas. |
| `kits` | Itens selecionados, com preço, quantidade e `subtotalCents`. |
| `totalCents` | Valor total calculado pelo servidor, em centavos. |
| `status` | Estado do processamento da inscrição. |
| `createdAt`, `expiresAt` | Data de criação e prazo da autorização de envio, atualmente de 30 minutos. |
| `processingAt`, `submittedAt` | Início do processamento e conclusão do envio. |
| `formSnapshot` | Cópia do slug, título, versão e perguntas do formulário na conclusão. |
| `driveFolderId` | Pasta específica da inscrição no Google Drive. |
| `documents` | Referências dos anexos: identificador, nome e URL do Drive. |
| `adminEmail` | Estado da notificação administrativa, tentativa e datas de envio/falha, além do identificador da mensagem quando enviada. |

### Estados da inscrição

| Estado | Significado |
| `authorized` | Dados validados e envio autorizado, aguardando processamento. |
| `processing` | O servidor assumiu o processamento dos arquivos. |
| `completed` | Envio concluído e referências dos arquivos registradas. |
| `failed` | O processamento falhou; uma nova tentativa pode ocorrer enquanto a autorização estiver válida. |
| `cleanup-required` | Houve falha e a limpeza da pasta incompleta do Drive também falhou. |

O fluxo normal é `authorized → processing → completed`. Os estados do e-mail são independentes: `sending`, `sent` e `failed`. Uma falha de notificação não desfaz uma inscrição concluída.

Os comprovantes ficam no Google Drive, não como arquivos binários no MongoDB. O servidor organiza uma subpasta pelo slug do formulário e uma pasta por inscrição, identificada pelo protocolo e, quando disponível, pelo primeiro nome. Também grava um arquivo `inscricao.json` no Drive.

A área administrativa lista registros com `status: completed`, com paginação e filtro por formulário. A conclusão confirma o recebimento da inscrição; o pagamento ainda deve ser conferido pela organização. Não há campo de aprovação de pagamento nesse fluxo analisado.

Referências: `site-coqueiral/src/app/api/inscricoes/autorizar/route.ts`, `src/server/registration-protocol.ts`, `src/app/api/inscricoes/recebidas/route.ts`, `src/server/email/registration-notification.ts` e `server-coqueiral/src/scripts/registrations.ts`.

## 5. integration_tokens — Integração com o Instagram

Guarda o token usado pelo servidor para acessar o Instagram e os dados que coordenam sua renovação. Atualmente, o código utiliza o documento com `_id: "instagram"`. Esta coleção não é utilizada para sessões de usuários nem para autorizações de inscrição.

| Campo | Uso |
| --- | --- |
| `_id` | Identificação da integração: `instagram`. |
| `encryptedToken` | Token criptografado com AES-256-GCM. |
| `seedHash` | Hash SHA-256 do token inicial, usado para detectar sua troca na configuração. |
| `initializedAt` | Data de inicialização do token. |
| `expiresAt` | Validade informada após a renovação. |
| `refreshedAt` | Data da última renovação bem-sucedida. |
| `lockId`, `lockUntil` | Trava temporária para impedir renovações simultâneas. |
| `lastFailureAt` | Data da última falha de renovação. |

A inicialização usa `TOKEN_INSTA`. A chave de criptografia fica na variável `INSTAGRAM_TOKEN_ENCRYPTION_KEY`, fora da coleção. Quando o token inicial muda, o código substitui o token persistido e reinicia os controles de renovação.

A rotina de renovação só considera tokens inicializados ou renovados há pelo menos 24 horas. Depois disso, renova quando não há validade registrada ou quando faltam até 15 dias para expirar. A trava dura até dois minutos.

Sem a chave de criptografia configurada, a leitura do token possui um modo de compatibilidade que usa diretamente `TOKEN_INSTA`, sem consultar esta coleção.

Referências: `site-coqueiral/src/server/instagram.ts` e `src/app/api/cron/instagram/route.ts`.

## Relações entre as coleções

- `registrationForms.slug` se relaciona com `registrations.slug`. É uma relação controlada pela aplicação, sem chave estrangeira de banco.
- `registrations.formSnapshot` preserva informações do formulário utilizado mesmo após alterações na configuração.
- `users` fornece a identidade e o perfil para a administração das inscrições. O fluxo público de inscrição não exige uma conta nem grava um vínculo obrigatório com um usuário associado.
- `news` divulga notícias e eventos; os formulários possuem configuração própria. O código analisado não estabelece vínculo obrigatório por ID entre publicação e formulário.
- `integration_tokens` atende à integração externa com o Instagram de forma independente das inscrições.

Valores monetários das inscrições e kits são armazenados em centavos. Datas de controle são gravadas como datas pelo servidor. Não foi identificado índice TTL nos trechos analisados: `expiresAt` controla a validade operacional e não implica exclusão automática dos documentos.

## Escopo

O código também contém referências à coleção `saae`, que não aparece na imagem enviada. Ela não foi incluída nesta especificação, cujo escopo são as cinco coleções listadas acima.
