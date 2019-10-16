const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const { usuario, senha } = require('./src/banco.json');

const app = express();
app.use(express.json());

mongoose.connect(
    `mongodb+srv://${usuario}:${senha}@simple-hello-3ozla.azure.mongodb.net/simpleHello?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
// Importando todos os models
requireDir('./src/models');

// Rotas recebidas do arquivo routes.js
app.use('/', require('./src/routes'));

app.listen(1234);