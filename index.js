
const prompt = require('prompt-sync')();


// Simulação de um sistema bancário simples

const usuarios = [
    {
        id: 1,
        nome: "Alexandre",
        login: "alex",
        senha: "1234",
        chavePix: "85988282464",
        saldo: 0
    },
    {
        id: 2,
        nome: "Felipe",
        login: "felp",
        senha: "1973",
        chavePix: "85985440535",
        saldo: 0
    },
]


const movimentacoes = [
    {
        id: 1,
        tipo: "deposito",
        valor: 500,
        origemId: null,
        destinoId: 1
    },
    {
        id: 2,
        tipo: "saque",
        valor: 100,
        origemId: 1,
        destinoId: null
    },
    {
        id: 3,
        tipo: "pix",
        valor: 150,
        origemId: 1,
        destinoId: 2
    },
    {
        id: 4,
        tipo: "deposito",
        valor: 300,
        origemId: null,
        destinoId: 3
    }
];

let usuarioLogado = {};

// ==== Início do programa ====
main();


// ==== FUNCÕES DO SISTEMA BANCÁRIO ==== 



// Função para gerar um ID aleatório
function gerarId() {
    const id = Math.floor(Math.random() * 1000);
    return id;
}

// Função para realizar o login do usuário
function login() {

}

// Função para exibir o menu de opções
function exibirMenu() {
    console.log("MENU DE OPÇÕES");
    console.log("Opção 1 : Saldo");
    console.log("Opção 2 : Depósito");
    console.log("Opção 3 : Saque");
    console.log("Opção 4 : Extrato");
    console.log("Opção 0 : Sair");
}
// Função para consultar o saldo do usuário
function consultarSaldo() {

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


// função para realizar um saque
function sacar() {

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
function enviarPix() {

}

// Função principal do sistema bancário
function main() {
    exibirMenu();
}




