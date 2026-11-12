
// Simulação de um sistema bancário simples

const prompt = require('prompt-sync')();

const usuarios = [
    {
        id: 1,
        nome: "Alexandre",
        login: "alex",
        senha: "1234",
        chavePix: "alex",
        saldo: 0
    },
    {
        id: 2,
        nome: "Felipe",
        login: "felp",
        senha: "1234",
        chavePix: "felp",
        saldo: 0
    },
    {
        id: 3,
        nome: "Ribamar",
        login: "riba",
        senha: "1234",
        chavePix: "riba",
        saldo: 0
    },
]


const movimentacoes = [];

let usuarioLogadoId = null;
let proximaMovimentacaoId = 1;

// ==== FUNÇÕES DO SISTEMA BANCÁRIO ====



// Função para gerar o próximo ID sequencial
function gerarId() {
    const id = proximaMovimentacaoId;
    proximaMovimentacaoId = proximaMovimentacaoId + 1;
    return id;
}

// Função para realizar o login do usuário
function fazerLogin() {
  while (true) {
    const loginInput = prompt("Login: ");
    if (loginInput === null) {
      console.log("\n[INFO] Login cancelado. Encerrando o sistema.");
      return null;
    }
    
    const senhaInput = prompt("Senha: ");
    if (senhaInput === null) {
      console.log("\n[INFO] Login cancelado. Encerrando o sistema.");
      return null;
    }
    
    let usuarioEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].login === loginInput && usuarios[i].senha === senhaInput) {
        usuarioEncontrado = usuarios[i];
        break;
      }
    }
    
    if (usuarioEncontrado !== null) {
      usuarioLogadoId = usuarioEncontrado.id;
      console.log(`\nBem-vindo, ${usuarioEncontrado.nome}!`);
      return usuarioLogadoId;
    } else {
      console.log("\n[ERRO] Login ou senha inválidos. Confira os dados e tente novamente.\n");
    }
  }
}


// Função para exibir o menu de opções
function exibirMenu(usuarioId) {
  while (true) {
    console.log("\n========================================");
    console.log("             UENO BANK | MENU");
    console.log("========================================");
    console.log("  1  Consultar saldo");
    console.log("  2  Fazer depósito");
    console.log("  3  Fazer saque");
    console.log("  4  Consultar extrato");
    console.log("  5  Enviar Pix");
    console.log("  0  Sair da conta");
    console.log("----------------------------------------");

    const opcao = prompt("Selecione uma opção de 0 a 5: ");
    
    // Ctrl+C encerra o sistema; a opção 0 retorna ao login.
    if (opcao === null) {
      console.log("\nSistema encerrado.");
      return false;
    }

    if (opcao.trim() === "0") {
      console.log("\nVocê saiu da conta. Faça login para continuar.");
      return true;
    }
    
    const opcaoTrim = opcao.trim();
    
    if (opcaoTrim === "1") {
      consultarSaldo(usuarioId);
    } else if (opcaoTrim === "2") {
      depositar(usuarioId);
    } else if (opcaoTrim === "3") {
      sacar(usuarioId);
    } else if (opcaoTrim === "4") {
      exibirExtrato(usuarioId);
    } else if (opcaoTrim === "5") {
      enviarPix(usuarioId);
    } else {
      console.log("\n[ERRO] Opção inválida. Digite um número de 0 a 5.");
    }
  }
}
// Função para consultar o saldo do usuário
function consultarSaldo(usuarioId) {
  let usuario = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === usuarioId) {
      usuario = usuarios[i];
      break;
    }
  }
  
  if (usuario !== null) {
    console.log("\n---------- SALDO DISPONÍVEL ----------");
    console.log(`Saldo disponível: R$ ${usuario.saldo}`);
    console.log("--------------------------------------");
  }
}


// Função para realizar um depósito
function solicitarValor() {
    let entrada = prompt("Valor em reais (inteiro positivo, ex.: 50): ");

    if (entrada === null) {
        return { status: "cancelado" };
    }

    if (entrada.trim() === "") {
        return { status: "invalido" };
    }

    let valor = Number(entrada);

    if (
        !Number.isFinite(valor) ||
        !Number.isInteger(valor) ||
        valor <= 0
    ) {
        return { status: "invalido" };
    }

    return {
        status: "valido",
        valor: valor
    };
}


// Função para realizar um deposito

function depositar(usuarioId) {

    // Solicitar o valor
    let resultado = solicitarValor();

    // Verificar se foi cancelado
    if (resultado.status === "cancelado") {
        console.log("\n[INFO] Depósito cancelado. Nenhuma alteração foi feita.");
        return;
    }

    // Verificar se o valor é inválido
    if (resultado.status === "invalido") {
        console.log("\n[ERRO] Valor inválido. Informe um inteiro positivo, como 50.");
        return;
    }

    // Procurar a conta pelo ID
    let conta = null;

    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].id === usuarioId) {
            conta = usuarios[i];
            break;
        }
    }

    // Verificar se a conta existe
    if (conta === null) {
        console.log("\n[ERRO] Não foi possível localizar sua conta.");
        return;
    }

    // Atualizar o saldo
    conta.saldo = conta.saldo + resultado.valor;

    // Registrar a movimentação
    movimentacoes.push({
        id: gerarId(),
        tipo: "deposito",
        valor: resultado.valor,
        origemId: null,
        destinoId: usuarioId
    });


    // Confirmar o depósito
    console.log("\n[OK] Depósito realizado.");
    console.log("Valor: R$ " + resultado.valor);
    console.log("Novo saldo: R$ " + conta.saldo);
}


// Função para realizar um saque
function sacar(usuarioId) {
    let resultado = solicitarValor();

    if (resultado.status === "cancelado") {
        console.log("\n[INFO] Saque cancelado. Nenhuma alteração foi feita.");
        return;
    }

    if (resultado.status === "invalido") {
        console.log("\n[ERRO] Valor inválido. Informe um inteiro positivo, como 50.");
        return;
    }

    let conta = null;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === usuarioId) {
            conta = usuarios[i];
            break;
        }
    }

    if (conta === null) {
        console.log("\n[ERRO] Não foi possível localizar sua conta.");
        return;
    }

    if (resultado.valor > conta.saldo) {
        console.log(`\n[ERRO] Saldo insuficiente. Disponível: R$ ${conta.saldo}.`);
        return;
    }

    conta.saldo = conta.saldo - resultado.valor;
    movimentacoes.push({
        id: gerarId(),
        tipo: "saque",
        valor: resultado.valor,
        origemId: usuarioId,
        destinoId: null
    });

    console.log("\n[OK] Saque realizado.");
    console.log("Valor: R$ " + resultado.valor);
    console.log("Novo saldo: R$ " + conta.saldo);
}

// funcão para exibir o extrato do usuário
function exibirExtrato(usuarioId) {
    var encontrouMovimentacao = false;
    var usuario = null;

    for (var k = 0; k < usuarios.length; k++) {
        if (usuarios[k].id === usuarioId) {
            usuario = usuarios[k];
            break;
        }
    }

    console.log("\n========================================");
    console.log(" EXTRATO" + (usuario !== null ? " | " + usuario.nome : ""));
    console.log("========================================");

    for (var i = 0; i < movimentacoes.length; i++) {
        var movimentacao = movimentacoes[i];

        if (
            movimentacao.origemId === usuarioId ||
            movimentacao.destinoId === usuarioId
        ) {
            encontrouMovimentacao = true;

            if (movimentacao.tipo === "deposito") {
                console.log(
                    "- Depósito: R$ " + movimentacao.valor
                );
            } 
            else if (movimentacao.tipo === "saque") {
                console.log(
                    "- Saque: R$ " + movimentacao.valor
                );
            } 
            else if (movimentacao.tipo === "pix") {

                if (movimentacao.origemId === usuarioId) {
                    var destinatario = null;

                    for (var j = 0; j < usuarios.length; j++) {
                        if (usuarios[j].id === movimentacao.destinoId) {
                            destinatario = usuarios[j];
                            break;
                        }
                    }

                    if (destinatario !== null) {
                        console.log(
                            "- Pix enviado para " +
                            destinatario.nome +
                            ": R$ " + movimentacao.valor
                        );
                    }
                } 
                else {
                    var remetente = null;

                    for (var j = 0; j < usuarios.length; j++) {
                        if (usuarios[j].id === movimentacao.origemId) {
                            remetente = usuarios[j];
                            break;
                        }
                    }

                    if (remetente !== null) {
                        console.log(
                            "- Pix recebido de " +
                            remetente.nome +
                            ": R$ " + movimentacao.valor
                        );
                    }
                }
            }
        }
    }

    if (!encontrouMovimentacao) {
        console.log("[INFO] Nenhuma movimentação registrada nesta conta.");
    }

    console.log("----------------------------------------");
}



// Função enviar pix
function enviarPix(usuarioId) {
    let origem = null;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === usuarioId) {
            origem = usuarios[i];
            break;
        }
    }

    if (origem === null) {
        console.log("\n[ERRO] Não foi possível localizar a conta de origem.");
        return;
    }

    let chavePix = prompt("Chave Pix de quem vai receber: ");

    if (chavePix === null) {
        console.log("\n[INFO] Pix cancelado. Nenhuma alteração foi feita.");
        return;
    }

    let destinatario = null;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].chavePix === chavePix) {
            destinatario = usuarios[i];
            break;
        }
    }

    if (destinatario === null) {
        console.log("\n[ERRO] Chave Pix não encontrada. Confira a chave e tente novamente.");
        return;
    }

    if (destinatario.id === origem.id) {
        console.log("\n[ERRO] Não é possível enviar Pix para sua própria conta.");
        return;
    }

    let resultado = solicitarValor();

    if (resultado.status === "cancelado") {
        console.log("\n[INFO] Pix cancelado. Nenhuma alteração foi feita.");
        return;
    }

    if (resultado.status === "invalido") {
        console.log("\n[ERRO] Valor inválido. Informe um inteiro positivo, como 50.");
        return;
    }

    if (resultado.valor > origem.saldo) {
        console.log(`\n[ERRO] Saldo insuficiente. Disponível: R$ ${origem.saldo}.`);
        return;
    }

    origem.saldo = origem.saldo - resultado.valor;
    destinatario.saldo = destinatario.saldo + resultado.valor;
    movimentacoes.push({
        id: gerarId(),
        tipo: "pix",
        valor: resultado.valor,
        origemId: origem.id,
        destinoId: destinatario.id
    });

    console.log("\n[OK] Pix enviado com sucesso.");
    console.log("Valor: R$ " + resultado.valor);
    console.log("Para: " + destinatario.nome);
    console.log("Novo saldo: R$ " + origem.saldo);
}

// Função principal do sistema bancário
function main() {
    while (true) {
        const usuarioId = fazerLogin();

        if (usuarioId === null) {
            return;
        }

        const saiuDaConta = exibirMenu(usuarioId);
        usuarioLogadoId = null;

        if (!saiuDaConta) {
            return;
        }
    }
}

// ==== Início do programa ====
main();




