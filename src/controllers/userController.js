const bcrypt = require('bcrypt'); // usei para criptografar a senha
const jwt = require('jsonwebtoken'); // usei para gerar o token de login
const User = require('../models/user'); 
require('dotenv').config(); 

// função pra criar um novo usuário
async function register(req, res) {
  const { name, email, password } = req.body; 

  try {
    const hash = await bcrypt.hash(password, 10); // aqui a senha é criptografada
    const user = await User.create({ name, email, password: hash }); 

    res.status(201).json({ 
      message: 'Usuário criado', 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário', details: err.message });
  }
}

// função de login do usuário
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } }); // procura o usuário pelo email
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' }); 

    const valid = await bcrypt.compare(password, user.password); // compara a senha digitada com a salva
    if (!valid) return res.status(401).json({ error: 'Senha inválida' });  
    // gera o token de acesso
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login realizado com sucesso', token }); 
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' }); 
  }
}

// função pra atualizar os dados do usuário
async function update(req, res) {
  try {
    const { id } = req.params; 
    const { name, email } = req.body; 

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.update({ name, email }); 
    res.json(user); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: err.message }); 
  }
}

module.exports = {
  register,
  login,
  update,
};
