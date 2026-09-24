const request = require("supertest");

const app = require("../index");
const sequelize = require("../config/database");

const Produto = require("../models/produto.model");

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterEach(async () => {
    await Produto.destroy({
        where: {},
        truncate: true
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe("CRUD de Produtos", () => {

    test("POST /produtos - deve criar produto", async () => {
        const response = await request(app)
            .post("/produtos")
            .send({
                nome: "Notebook",
                preco: 3500
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.nome).toBe("Notebook");
        expect(response.body.preco).toBe(3500);
    });

    test("POST /produtos - deve rejeitar produto sem nome", async () => {
        const response = await request(app)
            .post("/produtos")
            .send({
                preco: 100
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.mensagem)
            .toBe("nome e preco são obrigatórios");
    });

    test("POST /produtos - deve rejeitar preço negativo", async () => {
        const response = await request(app)
            .post("/produtos")
            .send({
                nome: "Mouse",
                preco: -10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.mensagem)
            .toBe("preço não pode ser negativo");
    });

    test("GET /produtos - deve listar produtos", async () => {
        await Produto.create({
            nome: "Mouse",
            preco: 120
        });

        const response = await request(app)
            .get("/produtos");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("GET /produtos/:id - deve buscar produto", async () => {
        const produto = await Produto.create({
            nome: "Teclado",
            preco: 180
        });

        const response = await request(app)
            .get(`/produtos/${produto.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.nome).toBe("Teclado");
    });

    test("GET /produtos/:id - deve retornar 404", async () => {
        const response = await request(app)
            .get("/produtos/9999");

        expect(response.statusCode).toBe(404);
        expect(response.body.mensagem)
            .toBe("Produto não encontrado");
    });

    test("PUT /produtos/:id - deve atualizar produto", async () => {
        const produto = await Produto.create({
            nome: "Mouse",
            preco: 100
        });

        const response = await request(app)
            .put(`/produtos/${produto.id}`)
            .send({
                nome: "Mouse Gamer",
                preco: 200
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.nome).toBe("Mouse Gamer");
        expect(response.body.preco).toBe(200);
    });

    test("PUT /produtos/:id - deve retornar 404", async () => {
        const response = await request(app)
            .put("/produtos/9999")
            .send({
                nome: "Produto",
                preco: 100
            });

        expect(response.statusCode).toBe(404);
    });

    test("PUT /produtos/:id - deve rejeitar preço negativo", async () => {
        const produto = await Produto.create({
            nome: "Mouse",
            preco: 100
        });

        const response = await request(app)
            .put(`/produtos/${produto.id}`)
            .send({
                preco: -50
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.mensagem)
            .toBe("preço não pode ser negativo");
    });

    test("DELETE /produtos/:id - deve excluir produto", async () => {
        const produto = await Produto.create({
            nome: "Teclado",
            preco: 180
        });

        const response = await request(app)
            .delete(`/produtos/${produto.id}`);

        expect(response.statusCode).toBe(204);

        const busca = await Produto.findByPk(produto.id);

        expect(busca).toBeNull();
    });

    test("DELETE /produtos/:id - deve retornar 404", async () => {
        const response = await request(app)
            .delete("/produtos/9999");

        expect(response.statusCode).toBe(404);
        expect(response.body.mensagem)
            .toBe("Produto não encontrado");
    });
});