const Produto = require("../models/produto.model");

class ProdutoRepository {
    async listar() {
        return await Produto.findAll();
    }

    async buscarPorId(id) {
        return await Produto.findByPk(id);
    }

    async criar(dados) {
        return await Produto.create(dados);
    }

    async atualizar(id, dados) {
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return null;
        }

        await produto.update(dados);

        return produto;
    }

    async excluir(id) {
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return false;
        }

        await produto.destroy();

        return true;
    }
}

module.exports = ProdutoRepository;