const express = require('express');
const swaggerDocs = require('./swagger'); 
require('dotenv').config();

const app = express();
const sequelize = require('./config/database');

// IMPORTAR TODOS OS MODELS para registrar relacionamentos antes do sync
require('./models/user');
require('./models/category');
require('./models/product');
require('./models/order');
require('./models/orderProduct'); // model intermediário N:N

// Rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Swagger
swaggerDocs(app);

// Sync + Start
sequelize.sync().then(() => {
  console.log('DB sincronizado');
  app.listen(3004, () => console.log('Servidor rodando na porta 3004'));
});
