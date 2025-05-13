/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuário
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra novo usuário
 *     tags: [Users]
 *     requestBody:
 *       description: Dados do novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Faz login e retorna um token
 *     tags: [Users]
 *     requestBody:
 *       description: Credenciais de login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT retornado
 */

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
