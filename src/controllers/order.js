const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const OrderProduct = require('../models/orderProduct'); 

async function create(req, res) {
  try {
    const { UserId, products } = req.body;

    if (!UserId || !Array.isArray(products)) {
      return res.status(400).json({ error: 'UserId e lista de produtos são obrigatórios' });
    }

    const order = await Order.create({ UserId });

    for (const item of products) {
      await OrderProduct.create({
        OrderId: order.id,
        ProductId: item.id,
        quantity: item.quantity
      });
    }

    const orderWithProducts = await Order.findByPk(order.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        },
        {
          model: Product,
          attributes: ['id', 'name', 'price'],
          through: { attributes: ['quantity'] } 
        }
      ]
    });

    res.status(201).json(orderWithProducts);
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    res.status(500).json({ error: 'Erro ao criar pedido', details: err.message });
  }
}

async function findAll(req, res) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        },
        {
          model: Product,
          attributes: ['id', 'name', 'price'],
          through: { attributes: ['quantity'] }
        }
      ]
    });
    res.json(orders);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err);
    res.status(500).json({ error: 'Erro ao buscar pedidos', details: err.message });
  }
}
async function remove(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });

    await order.destroy();
    res.json({ message: 'Pedido removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover pedido', details: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { status, products } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });

    // Atualiza status, se fornecido
    if (status) {
      order.status = status;
      await order.save();
    }

    // Se quiser atualizar os produtos
    if (Array.isArray(products)) {
      await order.setProducts([]); // remove os atuais
      for (const item of products) {
        await OrderProduct.create({
          OrderId: order.id,
          ProductId: item.id,
          quantity: item.quantity
        });
      }
    }

    const updatedOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, attributes: ['id', 'name'] },
        {
          model: Product,
          attributes: ['id', 'name', 'price'],
          through: { attributes: ['quantity'] }
        }
      ]
    });

    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar pedido', details: err.message });
  }
}


module.exports = {
  create,
  findAll,
  remove,
  update
};
