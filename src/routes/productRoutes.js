const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.get('/private', auth, (req, res) => {
  res.json({
    message: 'Você acessou uma rota protegida!',
    user: req.user, 
  });
});

module.exports = router;
