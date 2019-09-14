const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const QRCode = mongoose.model('QRCode');

routes.get('/', async (req, res) =>{
    // const user = await User.findOne();
    // QRCode.create({
    //     _idUser: user._id,
    //     permissoes: [
    //         'cpf',
    //         'cnpj'
    //     ],
    //     dateValidade: Date.now()
    // })
    const qrcode = await QRCode.findOne();
    const user = await User.findById(qrcode._idUser);
    res.json(user);
});

module.exports = routes;