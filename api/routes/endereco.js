const express = require('express');
const router = express.Router();
const controllerEndereco = require('../controllers/endereco-controller');

router.get('/', controllerEndereco.getAll);


router.get('/:enderecoId', controllerEndereco.getById);

router.post('/', controllerEndereco.postEndereco);

router.delete('/:enderecoId', controllerEndereco.deleteEndereco);

module.exports = router;