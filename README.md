# Sistema Bancário — Raciocínio Lógico

Projeto acadêmico desenvolvido por uma equipe de três integrantes para a disciplina de **Raciocínio Lógico**. A proposta é construir uma simulação bancária em JavaScript, aplicando a resolução de problemas e a construção de algoritmos a situações como consultar saldo, sacar e transferir valores entre contas.

## Estado do projeto

**Em desenvolvimento.** Atualmente, o arquivo [`index.js`](index.js) contém dados de exemplo, exibe um menu no console e solicita uma opção com `prompt`. A opção ainda não executa uma operação bancária, e o login ainda não está implementado.

As funcionalidades completas e a adequação dos dados iniciais estão organizadas nas [issues do projeto](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues), agrupadas na milestone [V1 — Sistema bancário com Pix](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/milestone/1).

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

O programa deve usar apenas JavaScript em um único `index.js`, sem HTML, CSS, frameworks, dependências externas, módulos ou ferramentas de compilação. A execução ocorre como snippet no navegador, com `prompt` e `console.log`. Markdown e o `package.json` existente podem permanecer como arquivos auxiliares; npm e Node não são necessários para executar o sistema.

O projeto utiliza **JavaScript no navegador**, com entradas por `prompt` e resultados por `console.log`. Os dados serão mantidos em memória com objetos e arrays, sem banco de dados ou armazenamento permanente. Ao iniciar uma nova execução, o estado será reiniciado.

A estrutura definida nos requisitos utiliza dois arrays:

| Array | Responsabilidade |
| --- | --- |
| `usuarios` | Guardar objetos com `id`, `nome`, `login`, `senha`, `chavePix` e `saldo`. |
| `movimentacoes` | Guardar objetos com `id`, `tipo`, `valor`, `origemId` e `destinoId`. |

Cada Pix terá **um único registro** em `movimentacoes`. No extrato da origem, ele será apresentado como “Pix enviado”; no extrato do destino, como “Pix recebido”. Depósitos terão `origemId` igual a `null`, e saques terão `destinoId` igual a `null`.

Essa é a estrutura prevista para a V1. Os dados de exemplo presentes no código inicial ainda precisam ser ajustados na [issue #1](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/1).

## Como executar

A forma oficial de execução é copiar o conteúdo completo de `index.js` para um único **snippet** — um trecho de código salvo nas ferramentas de desenvolvedor — no Chrome ou no Edge:

1. Baixe o repositório ou clone com Git:

   ```bash
   git clone https://github.com/AlexandreLira/projeto-v3-raciocinio-logico.git
   ```

2. Abra uma página comum no navegador e abra as ferramentas de desenvolvedor pelo menu do navegador, em **Mais ferramentas → Ferramentas do desenvolvedor**.
3. Na aba **Sources / Fontes**, encontre **Snippets**. Se necessário, use o menu de abas adicionais do painel.
4. Crie um snippet e copie para ele o conteúdo de [`index.js`](index.js).
5. Execute o snippet com o botão de execução ou com `Ctrl + Enter` no Windows/Linux e `Command + Enter` no macOS.
6. Digite uma opção no `prompt` e consulte a aba **Console** para visualizar o menu impresso.

Nesta etapa, o resultado esperado é a exibição do menu e a leitura da opção. As operações serão adicionadas conforme as issues forem concluídas. Para repetir a experiência em um contexto limpo, recarregue a página antes de executar novamente.

O `prompt` usado neste exercício é fornecido pelo navegador. Executar `node index.js` não oferece essa função. Não é necessário instalar dependências para experimentar o código atual.

## Organização prevista de index.js

A base da issue #1 organizará o arquivo nas seguintes seções, com uma única declaração por função:

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
| `exibirMenu(usuarioId)` | Repete o menu, chama as operações e encerra com `0` ou cancelamento. |
| `consultarSaldo(usuarioId)` | Exibe o saldo da conta indicada. |
| `solicitarValor()` | Retorna `{ status: "valido", valor }`, `{ status: "invalido" }` ou `{ status: "cancelado" }`. Não altera os dados. |
| `depositar(usuarioId)` / `sacar(usuarioId)` | Solicitam valor e atualizam saldo, histórico e contador apenas após todas as validações. |
| `exibirExtrato(usuarioId)` | Exibe os registros da conta sem alterar dados. |
| `enviarPix(usuarioId)` | Solicita destinatário e valor; valida, atualiza as duas contas e registra um único Pix. |

As funções acessam os arrays e o contador compartilhados definidos no início do arquivo. Funções provisórias serão substituídas pela implementação na mesma seção, sem duplicar declarações.

## Organização da equipe

| Integrante | Responsabilidades | Issues |
| --- | --- | --- |
| [AlexandreLira](https://github.com/AlexandreLira) | Preparar a base, implementar Pix, revisar entregas e integrar a versão final. | [#1 — Base](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/1), [#8 — Pix](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/8), [#9 — Integração](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/9) |
| Integrante a definir — Colega 1 | Implementar login, menu, consulta de saldo e extrato. | [#2 — Login](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/2), [#3 — Menu e saldo](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/3), [#7 — Extrato](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/7) |
| Integrante a definir — Colega 2 | Implementar validação de valores, depósito e saque. | [#4 — Validação](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/4), [#5 — Depósito](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/5), [#6 — Saque](https://github.com/AlexandreLira/projeto-v3-raciocinio-logico/issues/6) |

A equipe começa pela issue #1, que define a base e os contratos das funções. Depois, os colegas trabalham em paralelo seguindo as dependências indicadas nas issues. Os três participam da validação final e da preparação da demonstração.

## Como contribuir

Cada integrante altera apenas as seções de sua responsabilidade em uma branch. Atualize a branch antes da revisão e resolva conflitos preservando as funções dos colegas. Os PRs integram as alterações ao mesmo `index.js`; não é necessário concatenar arquivos. AlexandreLira cuida dos dados, da inicialização, do Pix e da integração; Colega 1 cuida de login, saldo, menu e extrato; Colega 2 cuida de validação, depósito e saque.

1. Leia a issue atribuída e confira se suas dependências já foram concluídas.
2. Atualize sua cópia do projeto e crie uma branch para a tarefa, como `feat/2-login`.
3. Implemente a funcionalidade respeitando os contratos definidos na base.
4. Execute os cenários de teste e confira o checklist de aceite da issue.
5. Abra um **Pull Request (PR)**, descrevendo a alteração e como ela foi testada. Inclua `Closes #2`, por exemplo, para vincular a entrega à issue correspondente.
6. Solicite a revisão de outro integrante antes de integrar a alteração.

AlexandreLira revisará as entregas dos colegas; um dos colegas revisará as entregas de AlexandreLira com apoio do checklist. Cada integrante deve conseguir explicar o funcionamento das funções que desenvolveu.

## Requisitos e validação

O documento [`requisitos-sistema-bancario.md`](requisitos-sistema-bancario.md) descreve as regras de negócio, a estrutura de dados e os cenários de aceitação. Ele é a referência para implementar e conferir cada funcionalidade.

Para testar uma função isoladamente, use uma cópia temporária do snippet completo e substitua somente o trecho de inicialização por chamadas de teste. Mantenha os dados e as funções necessários. Recarregue a página antes de executar novamente para recriar o estado inicial. Dados temporários e chamadas de teste não devem entrar no arquivo entregue.

Para validar Pix enviado e recebido, chame `exibirExtrato` para os dois IDs no mesmo snippet de teste, após preparar ou realizar a transferência. Isso não acrescenta troca de usuário ao menu.

A validação prevista é manual, incluindo operações válidas, entradas inválidas, cancelamentos e saldo insuficiente. Ainda não há uma suíte de testes automatizados; o comando `npm test` contém apenas a configuração inicial do projeto.

Para verificar os dois extratos de um Pix, será necessário consultar os registros dos dois usuários no mesmo estado em memória. A V1 não prevê troca de usuário durante a execução, e reiniciar o programa limpa os dados.
