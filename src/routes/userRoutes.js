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

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/user');

router.post('/register', userController.register);
router.post('/login', userController.login);

// ✅ Rota GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: err.message });
  }
});

router.put('/:id', userController.update);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.destroy();
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: err.message });
  }
});

module.exports = router;

