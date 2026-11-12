
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
    const loginInput = prompt("Digite o login:");
    if (loginInput === null) {
      return null;
    }
    
    const senhaInput = prompt("Digite a senha:");
    if (senhaInput === null) {
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
      return usuarioLogadoId;
    } else {
      console.log("Usuário ou senha inválidos.");
    }
  }
}


// Função para exibir o menu de opções
function exibirMenu(usuarioId) {
  let executando = true;
  
  while (executando) {
    const opcao = prompt(
      "Escolha uma opção:\n" +
      "1 — Saldo\n" +
      "2 — Depósito\n" +
      "3 — Saque\n" +
      "4 — Extrato\n" +
      "5 — Pix\n" +
      "0 — Sair"
    );
    
    // Tratar cancelamento (null) ou opção "0 — Sair"
    if (opcao === null || opcao.trim() === "0") {
      executando = false;
      break;
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
      console.log("Opção inválida. Escolha uma opção válida do menu.");
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
    console.log(`Seu saldo atual é: R$ ${usuario.saldo}`);
  }
}


// Função para realizar um depósito
function solicitarValor() {
    let entrada = prompt("Digite o valor:");

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
        return;
    }

    // Verificar se o valor é inválido
    if (resultado.status === "invalido") {
        console.log("Valor inválido!");
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
        console.log("Conta não encontrada.");
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
    console.log("Depósito realizado com sucesso!");
    console.log("Valor depositado: R$ " + resultado.valor);
    console.log("Saldo atual: R$ " + conta.saldo);
}


// Função para realizar um saque
function sacar(usuarioId) {
    let resultado = solicitarValor();

    if (resultado.status === "cancelado") {
        return;
    }

    if (resultado.status === "invalido") {
        console.log("Valor inválido!");
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
        console.log("Conta não encontrada.");
        return;
    }

    if (resultado.valor > conta.saldo) {
        console.log("Saldo insuficiente.");
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

    console.log("Saque realizado com sucesso!");
    console.log("Valor sacado: R$ " + resultado.valor);
    console.log("Saldo atual: R$ " + conta.saldo);
}

// funcão para exibir o extrato do usuário
function exibirExtrato(usuarioId) {
    var encontrouMovimentacao = false;

    console.log("========== EXTRATO ==========");

    for (var i = 0; i < movimentacoes.length; i++) {
        var movimentacao = movimentacoes[i];

        if (
            movimentacao.origemId === usuarioId ||
            movimentacao.destinoId === usuarioId
        ) {
            encontrouMovimentacao = true;

            if (movimentacao.tipo === "deposito") {
                console.log(
                    "Depósito: R$ " + movimentacao.valor
                );
            } 
            else if (movimentacao.tipo === "saque") {
                console.log(
                    "Saque: R$ " + movimentacao.valor
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
                            "Pix enviado para " +
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
                            "Pix recebido de " +
                            remetente.nome +
                            ": R$ " + movimentacao.valor
                        );
                    }
                }
            }
        }
    }

    if (!encontrouMovimentacao) {
        console.log("Nenhuma movimentação registrada");
    }

    console.log("=============================");
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
        console.log("Conta de origem não encontrada.");
        return;
    }

    let chavePix = prompt("Digite a chave Pix do destinatário:");

    if (chavePix === null) {
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
        console.log("Destinatário inválido.");
        return;
    }

    if (destinatario.id === origem.id) {
        console.log("Não é permitido enviar Pix para a própria conta.");
        return;
    }

    let resultado = solicitarValor();

    if (resultado.status === "cancelado") {
        return;
    }

    if (resultado.status === "invalido") {
        console.log("Valor inválido!");
        return;
    }

    if (resultado.valor > origem.saldo) {
        console.log("Saldo insuficiente.");
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

    console.log("Pix realizado com sucesso!");
    console.log("Valor enviado: R$ " + resultado.valor);
    console.log("Destinatário: " + destinatario.nome);
}

// Função principal do sistema bancário
function main() {
    const usuarioId = fazerLogin();

    if (usuarioId !== null) {
        exibirMenu(usuarioId);
    }
}

// ==== Início do programa ====
main();




