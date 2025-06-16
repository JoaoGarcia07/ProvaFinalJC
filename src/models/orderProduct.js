const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order');
const Product = require('./product');

// relação N:N 
const OrderProduct = sequelize.define('OrderProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  }
});

Order.belongsToMany(Product, { through: OrderProduct }); // Um pedido pode ter vários produtos
Product.belongsToMany(Order, { through: OrderProduct }); // Um produto pode estar em vários pedidos

module.exports = OrderProduct; 
