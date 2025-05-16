const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */

router.get('/', productController.findAll);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post('/',  productController.create);
router.put('/:id',  productController.update);
router.delete('/:id',  productController.remove);

module.exports = router;
