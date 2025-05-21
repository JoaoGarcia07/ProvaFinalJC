const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  }
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;
