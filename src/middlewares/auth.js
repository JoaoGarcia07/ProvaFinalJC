const jwt = require('jsonwebtoken'); // bibliotecatoken JWT
require('dotenv').config(); // carrega a chave do .env

// middleware de autenticação
function auth(req, res, next) {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; 

  // se não tiver token, bloqueia o acesso
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  // verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user; 
    next();
  });
}

module.exports = auth; 