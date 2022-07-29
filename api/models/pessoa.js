const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true},
        sobrenome: {type: String, required: false},
        telefone: {type: String, required: false},
        email:  {type: String, required: false},
        status: {type: String, required: false}
    },
    {
        timestamps: true
    }
);

mongoose.model('Pessoa', pessoaSchema);