const Product = require('../models/product');
const Category = require('../models/category');

// Define o relacionamento aqui diretamente
Product.belongsTo(Category);
Category.hasMany(Product);

// Criar produto
async function create(req, res) {
  try {
    const { name, price, description, CategoryId } = req.body;

    if (!CategoryId) {
      return res.status(400).json({ error: 'CategoryId é obrigatório' });
    }

    const categoryExists = await Category.findByPk(CategoryId);
    if (!categoryExists) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    const product = await Product.create({ name, price, description, CategoryId });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar produto', details: err.message });
  }
}

// Listar todos
async function findAll(req, res) {
  try {
    const produtos = await Product.findAll({
      include: {
        model: Category,
        attributes: ['id', 'name']
      }
    });
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ error: 'Erro ao listar produtos', details: err.message });
  }
}

// Atualizar
async function update(req, res) {
  const { id } = req.params;
  const { name, price, description, CategoryId } = req.body;

  try {
    const produto = await Product.findByPk(id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    await produto.update({ name, price, description, CategoryId });
    res.json(produto);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar produto', details: err.message });
  }
}

// Deletar
async function remove(req, res) {
  const { id } = req.params;

  try {
    const produto = await Product.findByPk(id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    await produto.destroy();
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar produto', details: err.message });
  }
}

module.exports = {
  create,
  findAll,
  update,
  remove,
};
