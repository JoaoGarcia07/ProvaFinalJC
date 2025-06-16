const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente', 
  }
});

Order.belongsTo(User); // Cria a chave estrangeirauserId
User.hasMany(Order); // Garante que o Sequelize saib que um usuário tm muitos pedidos

module.exports = Order; 