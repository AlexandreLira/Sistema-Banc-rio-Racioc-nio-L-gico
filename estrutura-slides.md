# Roteiro de apresentação — Ueno Bank, O Banco da Esperança

- **Tema:** colaboração com Git e GitHub aplicada a um projeto acadêmico
- **Equipe:** Alexandre, Felipe e Ribamar
- **Tom:** didático, leve e bem-humorado
- **Identidade:** azul-marinho, verde-esmeralda e branco
- **Slogan:** “Seu dinheiro entra com confiança, seu saque depende da esperança!”

> O Ueno Bank é uma paródia acadêmica e uma simulação local. A apresentação não afirma fatos sobre uma instituição financeira real nem sugere vínculo com ela.

## Slide 1 — Ueno Bank: O Banco da Esperança

**Ideia principal:** Apresentar o banco fictício e o tom de paródia da demonstração.

**Na tela:**
- Ueno Bank
- O Banco da Esperança
- “Seu dinheiro entra com confiança, seu saque depende da esperança!”
- Dados em memória: a esperança termina quando o processo fecha
- Paródia acadêmica — sem vínculo com instituição real

**Fala sugerida:** “Bem-vindos ao Ueno Bank — O Banco da Esperança. Seu dinheiro entra com confiança e seu saque depende da esperança. É uma simulação acadêmica: o saldo vive na memória do computador e reinicia quando o processo termina.”

**Visual sugerido:** Logo existente do projeto, com azul-marinho, verde-esmeralda e branco; cofrinho ao lado de um terminal e uma nota de paródia acadêmica.

## Slide 2 — Um banco para aprender a colaborar

**Ideia principal:** O projeto simula operações bancárias enquanto a equipe pratica desenvolvimento colaborativo.

**Na tela:**
- JavaScript executado no terminal
- Login, saldo, depósito, saque, extrato e Pix
- Dados em memória, sem persistência
- Objetivo principal: aprender Git e GitHub em equipe

**Fala sugerida:** “O banco é o cenário e a esperança é o slogan. O principal aprendizado foi dividir tarefas, integrar o código e acompanhar as mudanças usando Git e GitHub.”

**Visual sugerido:** Diagrama simples ligando “Ueno Bank” a duas frentes: “funcionalidades” e “colaboração”.

## Slide 3 — Três pessoas, responsabilidades compartilhadas

**Ideia principal:** A equipe distribuiu responsabilidades e integrou o trabalho em um único projeto.

**Na tela:**
- **Alexandre:** organização da base, estrutura do projeto, Pix, revisão e integração
- **Felipe:** login, menu, consulta de saldo e extrato
- **Ribamar:** validação de valores, depósito e saque
- Felipe e Ribamar contribuíram como programadores juniores

**Fala sugerida:** “Alexandre organizou a estrutura e coordenou a integração. Felipe e Ribamar implementaram partes importantes do sistema como programadores juniores. A divisão ajudou cada um a trabalhar em tarefas claras e aprender com a revisão do restante da equipe.”

**Visual sugerido:** Três cartões com nomes e responsabilidades conectados ao repositório compartilhado.

## Slide 4 — Do pedido ao código integrado

**Ideia principal:** Um fluxo simples no GitHub ajuda a levar uma tarefa da ideia até a versão integrada.

**Na tela:**
- Issue: descrever e acompanhar uma tarefa
- Branch: trabalhar isoladamente
- Commit: registrar uma mudança
- Pull Request: propor a integração
- Revisão → merge

**Fala sugerida:** “A issue explica o que precisa ser feito; a branch dá um espaço de trabalho; os commits registram o progresso; e o Pull Request permite revisar antes de integrar.”

**Visual sugerido:** Fluxo horizontal: **Issue → branch → commits → Pull Request → revisão → merge**.

## Slide 5 — Do planejamento à entrega: Pix entre usuários

**Ideia principal:** O histórico da implementação do Pix mostra uma tarefa real percorrendo issue, branch, commit e merge.

**Na tela:**
- **Issue #8 — Implementar Pix entre usuários:** [abrir issue](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/issues/8)
- **Branch:** `8-implementar-pix-entre-usuários`
- **Commit `fbd0344`:** `feat: implementar Pix entre usuários` ([ver commit](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/commit/fbd03442e48c610f3ca999fdfa8707b8bd952858))
- **PR #16:** [Implementa Pix entre usuários](https://github.com/AlexandreLira/Sistema-Banc-rio-Racioc-nio-L-gico/pull/16), mesclado em `master` em 11/11/2026
- **Resultado:** saldos atualizados e um único registro Pix compartilhado; o PR fecha a issue com `Closes #8`.

**Fala sugerida:** “A issue #8 descreveu o Pix entre usuários. A branch separou o trabalho; o commit fbd0344 registrou a implementação; e o PR #16 foi mesclado em master, fechando a tarefa. O resultado atualiza os dois saldos com um único registro Pix.”

**Visual sugerido:** Mostrar a issue #8, a branch e o commit na página do PR #16, que registra o merge em `master`. O PR não tem revisão formal registrada; não apresentá-lo como aprovado em uma revisão.

## Slide 6 — Revisar e resolver conflitos faz parte

**Ideia principal:** Revisões ajudam a melhorar uma mudança antes do merge, e conflitos indicam que é preciso escolher como combinar alterações concorrentes.

**Na tela:**
- Revisão: entender e comentar a mudança proposta
- Conflito: duas alterações disputam o mesmo trecho
- Comparar versões, decidir a combinação e validar o resultado
- Exemplo real da equipe: `[inserir, se houver]`

**Fala sugerida:** “Um conflito não significa que o Git perdeu o projeto. Ele sinaliza que não consegue escolher sozinho entre duas versões. A equipe compara as mudanças, decide como combiná-las e confere o resultado. Este slide explica o processo; só apresentaremos um caso como experiência da equipe se houver um exemplo real para mostrar.”

**Visual sugerido:** Diagrama genérico com duas alterações chegando ao mesmo arquivo e uma etapa de resolução; não usar como se fosse um incidente real da equipe.

## Slide 7 — Demonstração: o Pix atravessa a troca de conta

**Ideia principal:** O histórico compartilhado permite conferir o envio e o recebimento do Pix entrando nas contas envolvidas.

**Na tela:**
1. Alexandre entra e deposita R$ 100.
2. Alexandre envia R$ 20 para a chave Pix `felp`.
3. Alexandre sai da conta; os dados continuam na execução.
4. Felipe entra e consulta o extrato: Pix recebido de Alexandre.
- Resultado: Alexandre R$ 80; Felipe R$ 20.

**Fala sugerida:** “Vamos acompanhar o mesmo Pix pelos dois lados. Depois que Alexandre sai da conta, Felipe entra sem reiniciar o processo e vê o recebimento no extrato: pelo menos esse dinheiro chegou ao destino. Ao fechar e iniciar o sistema de novo, os dados são reiniciados porque não há persistência.”

**Visual sugerido:** Captura do terminal ou sequência com duas colunas: extrato de Alexandre (“Pix enviado”) e extrato de Felipe (“Pix recebido”).

## Slide 8 — O que aprendemos trabalhando juntos

**Ideia principal:** Ferramentas colaborativas ajudam quando a equipe combina responsabilidades, comunicação e revisão.

**Na tela:**
- Dividir tarefas sem perder a visão do projeto todo
- Registrar mudanças em commits
- Revisar antes de integrar
- Conversar para resolver dúvidas e conflitos
- Cada integrante deve conseguir explicar o que foi integrado

**Fala sugerida:** “Git e GitHub não substituem a conversa da equipe. Eles dão estrutura para colaborar, mas é a comunicação que ajuda a entender mudanças, revisar com cuidado e decidir como integrar.”

**Visual sugerido:** Quadro com quatro palavras conectadas: tarefas, registro, revisão e colaboração.

## Slide 9 — Encerramento: saldo conciliado, merge aprovado

**Ideia principal:** Encerrar reforçando o aprendizado da equipe com uma última piada sobre o banco fictício e o trabalho integrado.

**Na tela:**
- “Se o Ueno Bank ‘quebrar’, que seja só no roteiro.”
- “Seu dinheiro entra com confiança, seu saque depende da esperança!”
- “Nosso melhor investimento foi aprender a colaborar.”
- Obrigado!

**Fala sugerida:** “O banco pode até viver de saldo temporário, mas o aprendizado da equipe fica. Obrigado — e prometemos não fazer merge na conta errada. Seu dinheiro entra com confiança; o merge também deve passar por revisão.”

**Visual sugerido:** Um cofrinho ao lado de um Pull Request aprovado; deixar claro pelo contexto e pela nota de abertura que a piada é sobre o banco fictício.

## Checklist da apresentação

- [ ] Confirmar a escrita e a pronúncia dos nomes: Alexandre, Felipe e Ribamar.
- [ ] Confirmar com a equipe a descrição das responsabilidades de cada pessoa.
- [ ] Inserir capturas de tela legíveis do terminal e do GitHub.
- [ ] Conferir os links da issue #8, do commit `fbd0344` e do PR #16.
- [ ] Só incluir um conflito como experiência da equipe se houver registro ou lembrança confirmada; caso contrário, manter a explicação genérica.
- [ ] Confirmar que a apresentação identifica o Ueno Bank como paródia acadêmica, sem vínculo com instituição real.
- [ ] Definir e ensaiar a duração: `[inserir duração]`.
- [ ] Ensaiar a demonstração de Pix e verificar as credenciais de demonstração antes de apresentar.
