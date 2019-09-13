const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

routes.get('/', (req, res) =>{
    User.create({
        name: 'Robson',
        password: 'senha'
    })
    res.send('<h1>Hello world!</h1>');
});

module.exports = routes;