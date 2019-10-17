const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const { usuario, senha } = require('./src/banco.json');

const app = express();


mongoose.connect(
    `mongodb://localhost:27017/simpleHello`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
// Importando todos os models
requireDir('./src/models');

app.use(cors());
app.use(express.json());
// Rotas recebidas do arquivo routes.js
app.use('/', require('./src/routes'));

app.listen(1234);