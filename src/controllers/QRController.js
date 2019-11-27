const mongoose = require('mongoose');
const encryption = require('../encryption');

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

        const permissoes = JSON.parse(await encryption.decrypt(data));

        const { userId } = req;
        const qrcode = await QRCode.create({ permissoes, _idUser: userId });

        return res.status(201).json();
    },

    /**
     * Responsável por devolver todos os QR Codes de um usuário. Ela busca todos os QR Codes a partir do ID de usuário recebido pelo JWT
     * e devolve um JSON.
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada pelo servidor
     */
    async index(req, res){
        const { userId } = req;
        const { id } = req.headers;
        const codes = await QRCode.find({ _idUser: userId });
        const encryptedCodes = await encryption.encrypt(id + ';' + JSON.stringify(codes));
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