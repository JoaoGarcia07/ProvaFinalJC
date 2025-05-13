const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const swaggerDocs = require('./swagger'); // <= importar swagger

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', protectedRoutes);

swaggerDocs(app); // <= inicializar Swagger em /api-docs

sequelize.sync().then(() => {
  console.log('DB sincronizado');
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
