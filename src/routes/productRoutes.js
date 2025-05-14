const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // se quiser proteger rotas
const productController = require('../controllers/product');

// Exemplo de rota pública (sem auth)
router.get('/', (req, res) => {
  res.send('Lista de produtos');
});

// Exemplo de rota protegida (exige token JWT)
router.post('/', auth, productController.create);

// Outras rotas...
// router.put('/:id', auth, productController.update);
// router.delete('/:id', auth, productController.remove);

module.exports = router;
