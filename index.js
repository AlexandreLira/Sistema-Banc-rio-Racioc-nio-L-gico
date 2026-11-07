
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

const movimentacoes = [
    [
        {
            id: 1,
            tipo: "deposito",
            valor: 100,
            origemId: null,
            destinoId: 1
        },
        {
            id: 2,
            tipo: "pix",
            valor: 30,
            origemId: 1,
            destinoId: 2
        }
    ]
]


console.log("MENU DE OPÇÕES");
console.log("Opção 1 : Saldo");
console.log("Opção 2 : Depósito");
console.log("Opção 3 : Saque");
console.log("Opção 4 : Extrato");
console.log("Opção 0 : Sair");

let opcao = prompt("Escolha sua opção:");
