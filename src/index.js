const express = require("express");

const sequelize = require("./config/database");
const produtoRoutes = require("./routes/produto.routes");

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log("Banco de dados conectado!");

        await sequelize.sync();

        console.log("Tabelas sincronizadas!");

        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    } catch (error) {
        console.error("Erro ao iniciar:", error);
    }
}

iniciarServidor();

module.exports = app;