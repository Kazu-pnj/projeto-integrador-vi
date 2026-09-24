const ProdutoRepository = require("../repositories/produto.repository");

const repository = new ProdutoRepository();

async function listar() {
    return await repository.listar();
}

async function buscarPorId(id) {
    return await repository.buscarPorId(id);
}

async function criar(dados) {
    if (!dados.nome || dados.preco == null) {
        throw new Error("nome e preco são obrigatórios");
    }

    if (dados.preco < 0) {
        throw new Error("preço não pode ser negativo");
    }

    return await repository.criar({
        nome: dados.nome,
        preco: dados.preco
    });
}

async function atualizar(id, dados) {
    if (dados.preco != null && dados.preco < 0) {
        throw new Error("preço não pode ser negativo");
    }

    return await repository.atualizar(id, dados);
}

async function excluir(id) {
    return await repository.excluir(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};