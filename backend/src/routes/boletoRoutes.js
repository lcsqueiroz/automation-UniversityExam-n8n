const express = require('express');
const router = express.Router();
const boletoController = require('../controllers/boletoController');

router.get('/', boletoController.listarBoletos);
router.post('/', boletoController.criarBoleto);
router.put('/:id/status', boletoController.atualizarStatus);

module.exports = router;
