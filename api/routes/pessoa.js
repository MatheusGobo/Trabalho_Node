const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const PessoaModel = mongoose.model('Pessoa');
const controllerPessoa = require('../controllers/pessoa-controller');

router.get('/', controllerPessoa.getAll);


router.get('/:pessoaId', controllerPessoa.getById);

router.post('/', controllerPessoa.postPessoa);

router.delete('/:pessoaId', controllerPessoa.deletePessoa);

module.exports = router;