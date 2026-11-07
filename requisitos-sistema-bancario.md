# Sistema Bancário em JavaScript — Requisitos da V1

## Objetivo

Simular um sistema bancário no navegador, com vários usuários fictícios. O usuário faz login e pode consultar seu saldo, depositar, sacar, enviar Pix para outro usuário e visualizar seu extrato.

## Escopo e restrições

- A V1 tem usuários fictícios previamente cadastrados, cada um com uma única conta e uma chave Pix. Ana e Bruno são as contas de demonstração descritas abaixo; suas credenciais servem apenas para testar o exercício.
- Cada conta começa com saldo de R$ 0. O histórico de movimentações começa vazio. Os dados ficam em memória, usando apenas objetos e arrays, sem banco de dados ou armazenamento permanente, e são reiniciados a cada nova execução.
- O Pix é uma simulação local entre usuários cadastrados, sem integração com serviços bancários reais.
- A entrada de dados usa `prompt`. O exercício pratica variáveis, objetos, arrays, `while` e `for`. A proposta assume que comparações e condicionais (`if` e `else`) também foram vistas em sala. A conversão das entradas e a exibição dos resultados devem seguir os recursos permitidos pelo professor.
- Cadastro de contas durante a execução e armazenamento permanente ficam fora da V1.
- A execução atende um usuário autenticado por vez. Escolher **0 — Sair** encerra o programa; a V1 não inclui troca de usuário durante a execução.

## Estrutura de dados

### Usuários

O array `usuarios` guarda um objeto por usuário, com os seguintes campos:

| Campo | Conteúdo |
| --- | --- |
| `id` | Número inteiro que identifica o usuário, único no array. |
| `nome` | Nome usado para identificar a pessoa na exibição. |
| `login` | Texto usado no login, único no array. |
| `senha` | Senha fictícia do exercício. |
| `chavePix` | Texto usado para localizar o destinatário de um Pix, único no array. |
| `saldo` | Saldo da conta em reais inteiros, inicialmente zero. |

Exemplo do estado inicial:

```javascript
const usuarios = [
  { id: 1, nome: "Ana", login: "ana", senha: "1234", chavePix: "ana", saldo: 0 },
  { id: 2, nome: "Bruno", login: "bruno", senha: "1234", chavePix: "bruno", saldo: 0 }
];

const movimentacoes = [];

let usuarioLogadoId = null;
let proximaMovimentacaoId = 1;
```

`usuarioLogadoId` identifica a conta autenticada após o login. Antes disso, vale `null`. Os saldos ficam nos objetos de `usuarios` e devem ser atualizados junto com o registro de cada operação concluída.

### Movimentações

O array `movimentacoes` guarda o histórico compartilhado de todas as contas, na ordem em que as operações foram concluídas. Cada registro contém:

| Campo | Conteúdo |
| --- | --- |
| `id` | Número inteiro único da movimentação, atribuído em sequência. |
| `tipo` | `"deposito"`, `"saque"` ou `"pix"`. |
| `valor` | Valor da operação em reais inteiros positivos. |
| `origemId` | ID de quem envia ou saca; `null` em depósitos. |
| `destinoId` | ID de quem recebe; `null` em saques. |

Os IDs de origem e destino, quando não forem `null`, devem corresponder a usuários existentes. `proximaMovimentacaoId` avança após cada registro concluído.

| Operação | `origemId` | `destinoId` |
| --- | --- | --- |
| Depósito | `null` | ID do usuário autenticado |
| Saque | ID do usuário autenticado | `null` |
| Pix | ID do usuário autenticado | ID do destinatário |

Por exemplo, depois de Ana depositar R$ 100 e enviar R$ 30 para Bruno, o histórico contém:

```javascript
[
  { id: 1, tipo: "deposito", valor: 100, origemId: null, destinoId: 1 },
  { id: 2, tipo: "pix", valor: 30, origemId: 1, destinoId: 2 }
]
```

Nesse estado, Ana tem saldo `70` e Bruno tem saldo `30`. O Pix possui um único registro, utilizado tanto no extrato de quem enviou quanto no de quem recebeu. Não há um array de extrato separado dentro de cada usuário.

## Requisitos funcionais

| ID | Funcionalidade | Comportamento esperado |
| --- | --- | --- |
| RF01 | Fazer login | Pedir login e senha em dois prompts. Percorrer `usuarios` e abrir o menu somente quando os dois dados corresponderem ao mesmo usuário. Guardar seu ID como usuário autenticado. |
| RF02 | Tratar erro ou cancelamento no login | Se algum campo estiver vazio ou incorreto, exibir “Usuário ou senha inválidos” e voltar a pedir o login. Se o usuário cancelar qualquer um dos dois prompts, encerrar o programa. |
| RF03 | Exibir o menu | Após o login, mostrar **1 — Saldo**, **2 — Depósito**, **3 — Saque**, **4 — Extrato**, **5 — Pix** e **0 — Sair**. Após cada operação, voltar ao menu. Se a opção for inválida, exibir um aviso e mostrar o menu novamente. |
| RF04 | Consultar saldo | Mostrar o saldo atual da conta autenticada. |
| RF05 | Depositar | Pedir o valor. Se for válido, somá-lo ao saldo da conta autenticada, adicionar um depósito a `movimentacoes` e confirmar a operação. |
| RF06 | Sacar | Pedir o valor. Se for válido e houver saldo suficiente, descontá-lo da conta autenticada, adicionar um saque a `movimentacoes` e confirmar a operação. Se o valor ultrapassar o saldo, informar “Saldo insuficiente”. |
| RF07 | Consultar extrato | Percorrer `movimentacoes` e mostrar somente os registros em que o usuário autenticado aparece em `origemId` ou `destinoId`, na ordem de registro. Mostrar tipo e valor; em Pix, mostrar “Pix enviado” para a origem e “Pix recebido” para o destino, identificando o outro usuário. Se não houver registros dessa conta, mostrar “Nenhuma movimentação registrada”. |
| RF08 | Sair | Encerrar a execução ao escolher `0` ou cancelar o menu principal. |
| RF09 | Enviar Pix | Pedir a chave Pix do destinatário e o valor. Validar destinatário existente, conta diferente da origem, valor válido e saldo suficiente antes de alterar os dados. Se tudo estiver correto, descontar da conta autenticada, creditar a conta de destino, adicionar um único registro de Pix a `movimentacoes` e confirmar a operação. Em caso de erro, informar o motivo e retornar ao menu. |

## Regras de negócio

- Depósitos, saques e Pix aceitam valores inteiros positivos em reais, como `50` e `100`. Entradas vazias, texto não numérico, zero, valores negativos e valores fracionários geram um aviso de valor inválido.
- O usuário pode sacar ou transferir até o valor total do saldo. Nesse caso, seu saldo fica zerado. Nenhuma operação pode deixar o saldo negativo.
- Depósitos e saques alteram apenas a conta autenticada. Um Pix altera a origem e o destino pelo mesmo valor, sem taxas.
- O destinatário do Pix deve ser encontrado pela chave Pix no array `usuarios`. Chave vazia ou inexistente gera um aviso de destinatário inválido.
- Não é permitido enviar Pix para a própria conta.
- Todas as validações devem ocorrer antes de alterar qualquer saldo ou adicionar uma movimentação. Uma operação concluída atualiza os saldos envolvidos e registra o movimento correspondente.
- Cancelar um depósito ou saque, ou qualquer prompt do Pix, retorna ao menu. Cancelamentos, valores inválidos, destinatários inválidos, Pix para a própria conta e operações sem saldo suficiente preservam todos os saldos e o histórico.
- O extrato é obtido do histórico compartilhado. Um Pix é registrado uma única vez e participa do extrato dos dois envolvidos; movimentações de terceiros não aparecem no extrato de quem não participou.

## Cenários de aceitação

Cada cenário começa com os dados iniciais, salvo quando indicar um saldo ou uma sequência de operações. Como a V1 não inclui troca de usuário, a verificação dos dois extratos após um Pix deve usar o mesmo estado em memória, consultando os registros por ID durante a validação da estrutura; reiniciar o programa apaga esse estado.

| Cenário | Resultado esperado |
| --- | --- |
| Informar `ana` e `1234`, ou `bruno` e `1234`, em execuções independentes | O menu é exibido para a conta correspondente. |
| Informar a senha errada ou um campo vazio | O sistema avisa que as credenciais são inválidas e pede o login novamente. |
| Cancelar o prompt de login ou de senha | O programa encerra antes de mostrar o menu. |
| Consultar saldo e extrato logo após o primeiro login | O saldo é R$ 0 e o extrato está vazio. |
| Ana depositar R$ 100 e depois sacar R$ 30 | Ana fica com R$ 70. Seu extrato mostra o depósito e depois o saque. Bruno permanece com R$ 0 e sem movimentações. |
| Tentar sacar R$ 80 com saldo de R$ 70 | O sistema informa “Saldo insuficiente”. Os saldos e o histórico permanecem iguais. |
| Digitar `abc` em um depósito ou cancelar a entrada do valor | O sistema retorna ao menu e preserva os saldos e o histórico. No caso de `abc`, também mostra um aviso. |
| Sacar R$ 70 com saldo de R$ 70 | O saque é registrado e o saldo fica em R$ 0. |
| Ana depositar R$ 100 e enviar Pix de R$ 30 para a chave `bruno` | Ana fica com R$ 70 e Bruno com R$ 30. O histórico contém um depósito e um único Pix. O extrato de Ana contém o depósito e “Pix enviado” para Bruno; o de Bruno contém somente “Pix recebido” de Ana. |
| Enviar Pix de R$ 80 com saldo de R$ 70 | O sistema informa “Saldo insuficiente” e preserva todos os saldos e o histórico. |
| Informar chave Pix vazia ou inexistente | O sistema informa destinatário inválido e preserva todos os saldos e o histórico. |
| Ana tentar enviar Pix para a chave `ana` | O sistema informa que não é permitido enviar Pix para a própria conta e preserva todos os saldos e o histórico. |
| Informar valor vazio, `abc`, `0`, `-10` ou `1.5` em um Pix para destinatário válido | O sistema informa valor inválido e preserva todos os saldos e o histórico. |
| Cancelar a chave ou o valor do Pix | O sistema retorna ao menu, sem alterar saldos ou adicionar registros. |
| Ana, com saldo de R$ 70, enviar Pix de R$ 70 para Bruno, com saldo de R$ 0 | Ana fica com R$ 0 e Bruno com R$ 70. Um único Pix é adicionado ao histórico. |
| Escolher `0` no menu e iniciar uma nova execução | O programa pede login novamente, restaura todos os saldos para R$ 0 e limpa o histórico de movimentações. |

## Onde praticar cada conceito

| Conceito | Aplicação |
| --- | --- |
| Variáveis | Guardar o ID do usuário autenticado, o próximo ID de movimentação e as entradas do usuário. |
| Objetos | Representar cada usuário e cada movimentação com seus campos. |
| Arrays | Agrupar os usuários cadastrados e o histórico compartilhado de movimentações. |
| `prompt` | Solicitar login, senha, opção do menu, chave Pix e valores. |
| `while` | Repetir o login após uma tentativa inválida e manter o menu ativo. |
| `for` | Localizar usuários no login, buscar destinatários pela chave Pix e selecionar movimentações para o extrato. |
| `if` e `else` | Validar credenciais, valores, destinatários e saldo; distinguir Pix enviado de recebido. |
