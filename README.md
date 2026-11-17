# Ueno Bank

![Logo Ueno Bank — Raciocínio Lógico](assets/logo-ueno-bank.png)

**Raciocínio Lógico**

Simulação bancária acadêmica desenvolvida por três estudantes para a disciplina de **Raciocínio Lógico**. Feita em JavaScript, tem como escopo usuários, saldos, depósitos, saques, extratos e Pix com objetos e arrays em memória.

O nome faz uma referência satírica ao banco paraguaio, sem vínculo com a instituição real. A identidade visual é utilizada na documentação e na apresentação acadêmica.

## Estado do projeto

**V1 integrada para demonstração.** O arquivo [`index.js`](index.js) inicia com três contas fictícias da equipe e oferece login, consulta de saldo, depósito, saque, extrato e Pix. As operações e o histórico existem apenas em memória e são reiniciados a cada nova execução.

O projeto é uma simulação acadêmica local, sem integração com serviços bancários. As funcionalidades da V1 foram organizadas nas [issues do projeto](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues), agrupadas na milestone [V1 — Sistema bancário com Pix](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/milestone/1).

## Objetivos de aprendizagem

O projeto permite praticar a decomposição de um problema em tarefas menores, a definição de regras e a verificação dos resultados de cada algoritmo.

| Conceito | Aplicação prevista |
| --- | --- |
| Variáveis | Guardar entradas, identificar o usuário autenticado e controlar os IDs das movimentações. |
| Operadores aritméticos e de comparação | Atualizar saldos, comparar credenciais e verificar se há dinheiro suficiente para uma operação. |
| Operadores lógicos | Combinar condições, como login e senha válidos ou participação do usuário em uma movimentação. |
| Condicionais (`if` e `else`) | Escolher operações e tratar entradas inválidas, cancelamentos e saldo insuficiente. |
| Laços (`while` e `for`) | Repetir o menu, procurar usuários e percorrer o histórico. |
| Funções | Dividir o programa em responsabilidades, como login, depósito, saque e Pix. |
| Objetos | Representar cada usuário e cada movimentação com seus respectivos campos. |
| Arrays | Agrupar usuários e manter o histórico das operações. |

O trabalho em equipe também exercita o uso de Git e GitHub, a revisão de código e a explicação das soluções desenvolvidas.

## Funcionalidades previstas para a V1

- Login com usuários fictícios previamente cadastrados.
- Consulta do saldo da conta autenticada.
- Depósitos e saques com validação de valores.
- Extrato individual com as movimentações em ordem de registro.
- Pix entre usuários cadastrados, com registro de quem enviou e de quem recebeu.
- Tratamento de entradas inválidas, cancelamentos e saldo insuficiente.
- Encerramento pelo menu.

Os valores serão representados em **reais inteiros positivos**, conforme os requisitos do exercício. Cada conta começará com saldo zero e o histórico começará vazio. O Pix será uma simulação local, sem integração com serviços bancários.

## Tecnologias e organização dos dados

O programa usa JavaScript em um único `index.js`, sem HTML, CSS, frameworks ou ferramentas de compilação. A execução usa Node.js e a dependência `prompt-sync` já declarada no `package.json`; a saída é exibida com `console.log`. Markdown e os arquivos do npm são auxiliares do projeto.

Os dados são mantidos em memória com objetos e arrays, sem banco de dados ou armazenamento permanente. Ao iniciar um novo processo, o estado é reiniciado.

A estrutura definida nos requisitos utiliza dois arrays:

| Array | Responsabilidade |
| --- | --- |
| `usuarios` | Guardar objetos com `id`, `nome`, `login`, `senha`, `chavePix` e `saldo`. |
| `movimentacoes` | Guardar objetos com `id`, `tipo`, `valor`, `origemId` e `destinoId`. |

Cada Pix terá **um único registro** em `movimentacoes`. No extrato da origem, ele será apresentado como “Pix enviado”; no extrato do destino, como “Pix recebido”. Depósitos terão `origemId` igual a `null`, e saques terão `destinoId` igual a `null`.

O estado inicial contém Alexandre, Felipe e Ribamar com saldo zero, histórico vazio, `usuarioLogadoId` igual a `null` e próxima movimentação igual a `1`.

## Como executar

Para executar o sistema, instale a dependência uma vez e inicie o programa pelo terminal:

1. Baixe ou clone o repositório:

   ```bash
   git clone https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico.git
   cd Sistema-Banc-rio-Racioc-nio-L-gico
   ```

2. Instale a dependência e inicie o programa:

   ```bash
   npm install
   npm start
   ```

3. Digite login, senha e opções no terminal. Use **0 — Sair da conta** para voltar ao login e entrar em outra conta; o estado permanece até encerrar o processo. Inicie novamente com `npm start` para zerar os saldos e o histórico.

Credenciais fictícias da equipe:

| Nome | Login | Senha | Chave Pix |
| --- | --- | --- | --- |
| Alexandre | `alex` | `1234` | `alex` |
| Felipe | `felp` | `1234` | `felp` |
| Ribamar | `riba` | `1234` | `riba` |

O `prompt-sync` fornece entrada síncrona no terminal. Para começar outra demonstração do zero, encerre e inicie novamente com `npm start`.

### Roteiro de demonstração

1. Entre como Alexandre (`alex` / `1234`) e consulte o saldo inicial de R$ 0.
2. Deposite R$ 100 e confira o saldo e o extrato.
3. Saque R$ 30 e confirme o saldo de R$ 70.
4. Envie um Pix de R$ 20 para a chave `felp`; Alexandre fica com R$ 50.
5. Escolha **0 — Sair da conta**, entre como Felipe (`felp` / `1234`) e consulte o extrato; ele mostra o Pix recebido de Alexandre e saldo de R$ 20.
6. Escolha **0 — Sair da conta** para voltar ao login. Encerre com `Ctrl+C`; uma nova execução inicia com saldos zero e histórico vazio.

O menu permite alternar entre contas durante a mesma execução, mantendo os dados em memória. Assim, você pode conferir o Pix enviado e recebido nos extratos de Alexandre e Felipe sem chamadas de teste.

## Organização de index.js

O arquivo organiza dados, validação, login, operações, menu e inicialização nas seguintes seções, com uma única declaração por função:

1. Dados e controle: `usuarios`, `movimentacoes`, `usuarioLogadoId` e `proximaMovimentacaoId`.
2. Validação de valores: `solicitarValor()`.
3. Login: `fazerLogin()`.
4. Consulta de saldo: `consultarSaldo(usuarioId)`.
5. Depósito: `depositar(usuarioId)`.
6. Saque: `sacar(usuarioId)`.
7. Extrato: `exibirExtrato(usuarioId)`.
8. Pix: `enviarPix(usuarioId)`.
9. Menu: `exibirMenu(usuarioId)`.
10. Inicialização: chamar o login e abrir o menu somente quando retornar um ID.

### Contratos das funções

| Função | Contrato |
| --- | --- |
| `fazerLogin()` | Guarda o ID em `usuarioLogadoId` e retorna esse ID; retorna `null` ao cancelar. |
| `exibirMenu(usuarioId)` | Repete o menu, chama as operações e retorna ao login com `0`; o cancelamento do menu encerra o processo. |
| `consultarSaldo(usuarioId)` | Exibe o saldo da conta indicada. |
| `solicitarValor()` | Retorna `{ status: "valido", valor }`, `{ status: "invalido" }` ou `{ status: "cancelado" }`. Não altera os dados. |
| `depositar(usuarioId)` / `sacar(usuarioId)` | Solicitam valor e atualizam saldo, histórico e contador apenas após todas as validações. |
| `exibirExtrato(usuarioId)` | Exibe os registros da conta sem alterar dados. |
| `enviarPix(usuarioId)` | Solicita destinatário e valor; valida, atualiza as duas contas e registra um único Pix. |

As funções acessam os arrays e o contador compartilhados no início do arquivo. O contador avança somente quando uma operação é concluída.

## Organização da equipe

| Integrante | Responsabilidades | Issues |
| --- | --- | --- |
| [AlexandreLira](https://github.com/AlexandreLira) | Preparar a base, implementar Pix, revisar entregas e integrar a versão final. | [#1 — Base](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/1), [#8 — Pix](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/8), [#9 — Integração](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/9) |
| [Felipe](https://github.com/felipelima208mj) | Implementar login, menu, consulta de saldo e extrato. | [#2 — Login](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/2), [#3 — Menu e saldo](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/3), [#7 — Extrato](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/7) |
| [Ribamar](https://github.com/ribamarj486-charadinha) | Implementar validação de valores, depósito e saque. | [#4 — Validação](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/4), [#5 — Depósito](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/5), [#6 — Saque](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/6) |

A equipe dividiu a implementação por função. A issue #9 reúne a verificação integrada dos contratos e cenários da V1 e a preparação da demonstração.

## Como contribuir

Cada integrante altera apenas as seções de sua responsabilidade em uma branch. Atualize a branch antes da revisão e resolva conflitos preservando as funções dos colegas. Os PRs integram as alterações ao mesmo `index.js`; não é necessário concatenar arquivos. AlexandreLira cuida dos dados, da inicialização, do Pix e da integração; [Felipe](https://github.com/felipelima208mj) cuida de login, saldo, menu e extrato; [Ribamar](https://github.com/ribamarj486-charadinha) cuida de validação, depósito e saque.

1. Leia a issue atribuída e confira se suas dependências já foram concluídas.
2. Atualize sua cópia do projeto e crie uma branch para a tarefa, como `feat/2-login`.
3. Implemente a funcionalidade respeitando os contratos definidos na base.
4. Execute os cenários de teste e confira o checklist de aceite da issue.
5. Abra um **Pull Request (PR)**, descrevendo a alteração e como ela foi testada. Inclua `Closes #2`, por exemplo, para vincular a entrega à issue correspondente.
6. Solicite a revisão de outro integrante antes de integrar a alteração.

AlexandreLira revisará as entregas dos colegas; um dos colegas revisará as entregas de AlexandreLira com apoio do checklist. Cada integrante deve conseguir explicar o funcionamento das funções que desenvolveu.

## Requisitos e validação

O documento [`requisitos-sistema-bancario.md`](requisitos-sistema-bancario.md) descreve as regras de negócio, a estrutura de dados e os cenários de aceitação. Ele é a referência para implementar e conferir cada funcionalidade.

Para testar uma função isoladamente, use uma cópia temporária de `index.js` e substitua somente a inicialização por chamadas de teste. Mantenha os dados e as funções necessários. Um novo processo recria o estado inicial. Dados temporários e chamadas de teste não devem entrar no arquivo entregue.

Para validar Pix enviado e recebido, faça a transferência, escolha **0 — Sair da conta**, entre com o login do destinatário e consulte seu extrato. Os saldos e o histórico continuam disponíveis durante o processo.

A validação da entrega é manual, cobrindo operações válidas, entradas inválidas, cancelamentos e saldo insuficiente. Não há suíte automatizada no projeto; `npm test` ainda é apenas o script inicial do pacote.

Sair da conta retorna ao login e mantém os dados em memória para a próxima sessão. Encerrar e iniciar o processo limpa saldos e movimentações.
