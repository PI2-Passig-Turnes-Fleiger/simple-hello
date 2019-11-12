const mongoose = require('mongoose');
const AccessCliente = mongoose.model('AccessCliente');
const User = mongoose.model('User');

module.exports = {
    async store(req, res){
        const { userId } = req;
        const { _id } = req.body;

        let ac = await AccessCliente.find({ _idQRCode: _id, _idCliente: userId });
        if(ac.length === 0)
            ac = await AccessCliente.create({ _idCliente: userId, _idQRCode: _id });
            
        res.json(ac);
    },

    async index(req, res){
        const { userId } = req;
        const accesses = await AccessCliente.find({ _idCliente: userId })
            .populate({
                path: '_idQRCode',
                populate: { path: '_idUser', select: 'nome sobrenome -_id' }
            });
        res.json(accesses);
    },

    async getInfo(req, res){
        const { _id } = req.query;

        const access = await AccessCliente.findById(_id).populate('_idQRCode');
        await AccessCliente.updateOne({ _id }, { lastAccess: Date.now() });
        const permissoes = access._idQRCode.permissoes;
        const user = await User.findById(access._idQRCode._idUser, permissoes.join(' '))

        res.json(user);
    }
}