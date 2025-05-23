/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints de pedidos
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido com produtos e quantidades
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - products
 *             properties:
 *               UserId:
 *                 type: integer
 *                 example: 1
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista todos os pedidos com produtos e usuário
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   Products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                         OrderProduct:
 *                           type: object
 *                           properties:
 *                             quantity:
 *                               type: integer
 */


/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Atualiza um pedido existente (status e/ou produtos)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: entregue
 *               products:
 *                 type: array
 *                 description: Lista de produtos com quantidade
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Remove um pedido existente
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 *       404:
 *         description: Pedido não encontrado
 */


const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/', orderController.create);
router.get('/', orderController.findAll);
router.delete('/:id', orderController.remove);
router.put('/:id', orderController.update);




module.exports = router;
