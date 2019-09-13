const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();

mongoose.connect(
    'mongodb://localhost:27017/teste_node',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
// Importando todos os models
requireDir('./src/models');

// Rotas recebidas do arquivo routes.js
app.use('/', require('./src/routes'));

app.listen(8080);