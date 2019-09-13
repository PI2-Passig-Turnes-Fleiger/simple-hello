const express = require('express');

const app = express();

// Rotas recebidas do arquivo routes.js
app.use('/', require('./src/routes'));

app.listen(8080);