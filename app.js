const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connect to MongoDB!!');
});

require('./api/models/pessoa');
require('./api/models/endereco');

const app = express();

const pessoaRoutes = require('./api/routes/pessoa');
const enderecoRoutes = require('./api/routes/endereco');

//Adiciona Log das chamadas.
app.use(morgan('dev'));

//para conseguir receber JSON na requisição
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/pessoa', pessoaRoutes);
app.use('/endereco', enderecoRoutes);

app.use((_req, _res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})


app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;