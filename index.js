const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá, Mundo!');
});

const Produto = [
  {id: 1, nome:"Notebook", preco:6700},
  {id: 2, nome:"Mouse", preco: 1200}
]

app.get("/produto" , (req, res) =>{
  res.status(200).json(Produto);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});