const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const QRCode = mongoose.model('QRCode');

module.exports = {
    async store(req, res){
        const { permissoes } = req.body;
        const { userId } = req;
        const qrcode = await QRCode.create({ permissoes, _idUser: userId });

        res.status(201).json(qrcode);
    },

    async index(req, res){
        const { userId } = req;
        const codes = await QRCode.find({ _idUser: userId })
        res.json(codes);
    }
};