const mongoose = require('mongoose');
const AccessCliente = mongoose.model('AccessCliente');
const User = mongoose.model('User');
const encryption = require('../encryption');

module.exports = {
    /**
     * Função usada para criar um novo AccessCliente no banco de dados. É chamada no POST na rota /qrcode/outros
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser enviada
     */
    async store(req, res){
        const { userId } = req;
        const { _id } = req.body;

        let ac = await AccessCliente.find({ _idQRCode: _id, _idCliente: userId });
        if(ac.length === 0)
            ac = await AccessCliente.create({ _idCliente: userId, _idQRCode: _id });
            
        res.json(ac);
    },

    /**
     * Função usada para mostrar todos os AccessCliente que estão associados a um userId
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser enviada
     */
    async index(req, res){
        const { userId } = req;
        const accesses = await AccessCliente.find({ _idCliente: userId })
            .populate({
                path: '_idQRCode',
                populate: { path: '_idUser', select: 'nome sobrenome -_id' }
            });
        
        const encryptedAccesses = encryption.encrypt(JSON.stringify(accesses));
        res.json({ data: encryptedAccesses });
    },

    /**
     * Função usada para enviar as informações de um usuário, usando o AccessCliente e o QR Code associado a ele.
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser enviada pelo servidor
     */
    async getInfo(req, res){
        const { _id } = req.query;

        const access = await AccessCliente.findById(_id).populate('_idQRCode');
        await AccessCliente.updateOne({ _id }, { lastAccess: Date.now() });
        const permissoes = access._idQRCode.permissoes;
        const user = await User.findById(access._idQRCode._idUser, permissoes.join(' '));

        const encryptedUser = encryption.encrypt(JSON.stringify(user));
        res.json({ data: encryptedUser });
    }
}