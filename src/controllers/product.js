const Product = require('../models/product');

// Criar produto
async function create(req, res) {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar produto', details: err.message });
  }
}

// Listar todos
async function findAll(req, res) {
  const produtos = await Product.findAll();
  res.json(produtos);
}

// Atualizar
async function update(req, res) {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const produto = await Product.findByPk(id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

  await produto.update({ name, price, description });
  res.json(produto);
}

// Deletar
async function remove(req, res) {
  const { id } = req.params;
  const produto = await Product.findByPk(id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

  await produto.destroy();
  res.json({ message: 'Produto removido com sucesso' });
}

module.exports = {
  create,
  findAll,
  update,
  remove,
};
