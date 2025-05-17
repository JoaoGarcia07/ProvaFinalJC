const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category'); 

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Product.belongsTo(Category); // lembrar para estudar Produto pertence a uma categoria
Category.hasMany(Product);   // lembrar para estudar Categoria tem muitos produtos

module.exports = Product;
