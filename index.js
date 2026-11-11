
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

}


// Função para realizar um deposito
function depositar() {

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




