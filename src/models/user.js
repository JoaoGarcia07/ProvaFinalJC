const sequelize = require('../config/database'); // IMPORTA O OBJETO Sequelize
const { DataTypes } = require('sequelize'); // NÃO instancie Sequelize aqui

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
