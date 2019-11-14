const mongoose = require('mongoose');
const encryption = require('../encryption');
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
        const { data } = req.body;
        const permissoes = JSON.parse(encryption.decrypt(data));

        const { userId } = req;
        const qrcode = await QRCode.create({ permissoes, _idUser: userId });

        const encryptedqrcode = encryption.encrypt(JSON.stringify(qrcode));
        res.status(201).json({ data: encryptedqrcode });
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
        const encryptedCodes = encryption.encrypt(JSON.stringify(codes));
        res.json({ data: encryptedCodes });
    },

    /**
     * Função usada para remover um QR Code, a partir do ID recebido em req.body
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser enviada pelo servidor
     */
    async delete(req, res){
        const { _id } = req.body;
        const { userId } = req;

        if(_id){
            await QRCode.deleteOne({ _id });
            res.json({ deleted: true, _id });
        } else{
            await QRCode.deleteMany({ _idUser: userId });
            res.json({ cleared: true });
        }
    }
};