const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/', orderController.create);
router.get('/', orderController.findAll);

module.exports = router;
