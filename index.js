
// Simulação de um sistema bancário simples

const usuarios = [
    {
        id: 1,
        nome: "Alexandre",
        login: "alex",
        senha: "1234",
        chavePix: "85988282464",
        saldo: 0
    }
]

const movimentacoes = []

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
function exibirExtrato() {

}

// Função enviar pix
function enviarPix() {

}

// Função principal do sistema bancário
function main() {
    exibirMenu();
}




