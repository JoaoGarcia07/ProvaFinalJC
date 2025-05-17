const Category = require('../models/category');

async function create(req, res) {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar categoria', details: err.message });
  }
}

async function findAll(req, res) {
  const categories = await Category.findAll();
  res.json(categories);
}

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByPk(id);
  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

  await category.update({ name });
  res.json(category);
}

async function remove(req, res) {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

  await category.destroy();
  res.json({ message: 'Categoria removida com sucesso' });
}

module.exports = {
  create,
  findAll,
  update,
  remove,
};
