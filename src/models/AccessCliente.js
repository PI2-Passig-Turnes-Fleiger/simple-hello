const mongoose = require('mongoose');

const AccessClienteSchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    _idCliente: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    _idQRCode: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'QRCode' },
    // Não sei se vale deixar o valor default
    lastAccess: { type: Date, default: Date.now }
});

mongoose.model('AccessCliente', AccessClienteSchema);