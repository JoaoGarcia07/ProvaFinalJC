const Category = require('../models/category'); 

// cria uma categoria nova
async function create(req, res) {
  const { name } = req.body; // pega o nome que foi enviado no corpo da requisição

  try {
    const category = await Category.create({ name }); // cria a categoria no banco
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar categoria', details: err.message }); 
  }
}

// lista todas as categorias cadastradas
async function findAll(req, res) {
  const categories = await Category.findAll();
  res.json(categories); 
}

// edita uma categoria já existente
async function update(req, res) {
  const { id } = req.params; 
  const { name } = req.body;
  const category = await Category.findByPk(id); 
  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' }); 

  await category.update({ name }); 
  res.json(category); 
}

// deleta uma categoria
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
