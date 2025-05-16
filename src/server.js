const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const swaggerDocs = require('./swagger'); 

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

swaggerDocs(app); 

sequelize.sync().then(() => {
  console.log('DB sincronizado');
  app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
});
