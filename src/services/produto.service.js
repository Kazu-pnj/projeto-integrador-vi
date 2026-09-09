const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 120 }
];

function listar() {
    return produtos;
}

function buscarPorId(id) {
    return produtos.find(p => p.id === Number(id));
}

function criar(dados) {
    if (!dados.nome || dados.preco == null) {
        throw new Error("nome e preco são obrigatórios");
    }

    const produto = {
        id: produtos.length + 1,
        nome: dados.nome,
        preco: dados.preco
    };

    produtos.push(produto);

    return produto;
}

module.exports = {
    listar,
    buscarPorId,
    criar
};