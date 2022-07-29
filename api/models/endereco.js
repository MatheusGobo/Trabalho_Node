const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema(
    {
        cep:{type: String, required:true},
        logradouro: {type: String, required: true},
        numero:     {type: String, requried: false},
        complemento:  {type: String,  required: false},
        bairro: {type: String, required: false},
        cidade: {type: String, required: false},
        uf: {type: String, required: false},
        pessoa: {type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa', required: true}
    },
    {
        timestamps: true
    }
);

mongoose.model('Endereco', enderecoSchema);