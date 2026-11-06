# Sistema Bancário em JavaScript — Requisitos da V1

## Objetivo

Simular uma conta bancária no navegador. O usuário faz login e pode consultar o saldo, depositar, sacar e visualizar o extrato.

## Escopo e restrições

- A V1 tem uma única conta de demonstração, com usuário `cliente` e senha `1234`. Essas credenciais são fictícias e servem para testar o exercício.
- A conta começa com saldo de R$ 0 e extrato vazio. Os dados ficam em memória e são reiniciados a cada nova execução.
- A entrada de dados usa `prompt`. O exercício pratica variáveis, arrays, `while` e `for`. A proposta assume que comparações e condicionais (`if` e `else`) também foram vistas em sala. A conversão das entradas e a exibição dos resultados devem seguir os recursos permitidos pelo professor.
- Cadastro de contas, transferências e armazenamento permanente ficam fora da V1.

## Requisitos funcionais

| ID | Funcionalidade | Comportamento esperado |
| --- | --- | --- |
| RF01 | Fazer login | Pedir usuário e senha em dois prompts. Abrir o menu somente quando os dois dados corresponderem à conta de demonstração. |
| RF02 | Tratar erro ou cancelamento no login | Se algum campo estiver vazio ou incorreto, exibir “Usuário ou senha inválidos” e voltar a pedir o usuário. Se o usuário cancelar qualquer um dos dois prompts, encerrar o programa. |
| RF03 | Exibir o menu | Após o login, mostrar **1 — Saldo**, **2 — Depósito**, **3 — Saque**, **4 — Extrato** e **0 — Sair**. Após cada operação, voltar ao menu. Se a opção for inválida, exibir um aviso e mostrar o menu novamente. |
| RF04 | Consultar saldo | Mostrar o saldo atual da conta. |
| RF05 | Depositar | Pedir o valor. Se for válido, somá-lo ao saldo, registrar o depósito no extrato e confirmar a operação. |
| RF06 | Sacar | Pedir o valor. Se for válido e houver saldo suficiente, descontá-lo do saldo, registrar o saque no extrato e confirmar a operação. Se o valor ultrapassar o saldo, informar “Saldo insuficiente”. |
| RF07 | Consultar extrato | Mostrar o tipo e o valor de cada movimentação, na ordem em que ocorreu. Se o extrato estiver vazio, mostrar “Nenhuma movimentação registrada”. |
| RF08 | Sair | Encerrar a execução ao escolher `0` ou cancelar o menu principal. |

## Regras de negócio

- Depósitos e saques aceitam valores inteiros positivos em reais, como `50` e `100`. Entradas vazias, texto não numérico, zero, valores negativos e valores fracionários geram um aviso de valor inválido.
- O usuário pode sacar até o valor total do saldo. Nesse caso, o saldo fica zerado.
- Cancelar um depósito ou saque retorna ao menu. Cancelamentos, valores inválidos e saques sem saldo suficiente preservam o saldo e o extrato.

## Cenários de aceitação

| Cenário | Resultado esperado |
| --- | --- |
| Informar `cliente` e `1234` | O menu é exibido. |
| Informar a senha errada ou um campo vazio | O sistema avisa que as credenciais são inválidas e pede o usuário novamente. |
| Cancelar o prompt de senha | O programa encerra antes de mostrar o menu. |
| Consultar saldo e extrato logo após o primeiro login | O saldo é R$ 0 e o extrato está vazio. |
| Depositar R$ 100 e depois sacar R$ 30 | O saldo fica em R$ 70. O extrato mostra o depósito e depois o saque. |
| Tentar sacar R$ 80 com saldo de R$ 70 | O sistema informa que o saldo é insuficiente. O saldo e o extrato permanecem iguais. |
| Digitar `abc` em um depósito ou cancelar a entrada do valor | O sistema retorna ao menu e preserva o saldo e o extrato. No caso de `abc`, também mostra um aviso. |
| Sacar R$ 70 com saldo de R$ 70 | O saque é registrado e o saldo fica em R$ 0. |
| Escolher `0` no menu e iniciar uma nova execução | O programa pede login novamente e reinicia o saldo e o extrato. |

## Onde praticar cada conceito

| Conceito | Aplicação |
| --- | --- |
| Variáveis | Guardar credenciais de demonstração, saldo e entradas do usuário. |
| `prompt` | Solicitar usuário, senha, opção do menu e valores. |
| `while` | Repetir o login após uma tentativa inválida e manter o menu ativo. |
| Array | Guardar os registros de depósitos e saques. |
| `for` | Percorrer o array de movimentações para exibir o extrato. |
