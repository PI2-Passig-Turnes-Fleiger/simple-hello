const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const QRCode = mongoose.model('QRCode');

module.exports = {
    /**
     * Responsável por criar um QR code. Recebe da requisição o ID do usuário e as permissões, criando o qr code no banco de dados com elas.
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada pelo servidor
     */
    async store(req, res){
        const { permissoes } = req.body;
        const { userId } = req;
        const qrcode = await QRCode.create({ permissoes, _idUser: userId });

        res.status(201).json(qrcode);
    },

    /**
     * Responsável por devolver todos os QR Codes de um usuário. Ela busca todos os QR Codes a partir do ID de usuário recebido pelo JWT
     * e devolve um JSON.
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada pelo servidor
     */
    async index(req, res){
        const { userId } = req;
        const codes = await QRCode.find({ _idUser: userId })
        res.json(codes);
    },

    async delete(req, res){
        const { _id } = req.body;

        await QRCode.deleteOne({ _id });

        res.json({ deleted: true, _id });
    }
};