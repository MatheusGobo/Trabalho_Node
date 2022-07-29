const mongoose = require('mongoose');
const EnderecoModel = mongoose.model('Endereco');
const PessoaModel   = mongoose.model('Pessoa');

module.exports ={
    getAll: async (_req, res, _next) => {
        try {
            const enderecos = await EnderecoModel.find().select("cep logradouro numero complemento bairro cidade uf pessoa _id");
            res.status(200).json({
                count: enderecos.length,
                enderecos: enderecos.map(endereco => {
                    return {
                        cep: endereco.cep,
                        logradouro: endereco.logradouro,
                        numero: endereco.numero,
                        complemento: endereco.complemento,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        uf: endereco.uf,
                        pessoa: endereco.pessoa,
                        _id: endereco._id,
                        request: {
                            type: "GET",
                            url: "https://localhost:3000/endereco/" + endereco._id
                        }
                    }
                })
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    postEndereco: async (req, res, _next) => {
        try {
            if (!req.body.pessoa) {
                res.status(400).json({
                    message: "Pessoa não existe"
                });
                return;
            }
    
            let pessoa = null;
            try {
                pessoa = await PessoaModel.findOne({ _id: req.body.pessoa})
                if (!pessoa) {
                    res.status(400).json({
                        message: "Pessoa não existe"
                    });
                    return;
                }
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
                return;
            }
    
            if (pessoa) {
                let endereco = new EnderecoModel({
                    cep: req.body.cep,
                    logradouro: req.body.logradouro,
                    numero: req.body.numero,
                    complemento: req.body.complemento,
                    bairro: req.body.bairro,
                    cidade: req.body.cidade,
                    uf: req.body.uf,
                    pessoa: req.body.pessoa
                });
                
                if (endereco.cep == null){
                    res.status(500).json({
                        message: "O CEP é obrigatório para o endereço."
                    });
                }

                await endereco.save();
    
    
                res.status(200).json({
                    message: 'Endereco criado com sucesso !',
                    createdOrder: {
                        cep: endereco.cep,
                        logradouro: endereco.logradouro,
                        numero: endereco.numero,
                        complemento: endereco.complemento,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        uf: endereco.uf,
                        pessoa: endereco.pessoa,
                        _id: endereco._id,
                        request: {
                            type: "GET",
                            url: "https://localhost:3000/endereco/" + endereco._id
                        }
                    }
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    getById: async (req, res, _next) => {
        const id = req.params.enderecoId;
    try {
        const endereco = await EnderecoModel.findOne({ _id: id });
        res.status(200).json({
            message: 'Success',
            endereco: endereco,
            request: {
                type: "GET",
                url: "https://localhost:3000/endereco/" + endereco._id
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
    },
    deleteEndereco: async (req, res, _next) => {
        const id = req.params.enderecoId;
    
        try {
            let status = await EnderecoModel.deleteOne({ _id: id })
    
            res.status(200).json({
                message: 'Endereço excluído',
                status: status
            })
    
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
};