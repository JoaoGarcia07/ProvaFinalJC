const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const swaggerDocs = require('./swagger'); 


app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


swaggerDocs(app); 

sequelize.sync({ force: true }).then(() => {
  console.log('DB sincronizado');
  app.listen(3006, () => console.log('Servidor rodando na porta 3006'));
});

