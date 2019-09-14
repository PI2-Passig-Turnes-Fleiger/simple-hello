const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    _idUser: { type: mongoose.Schema.Types.ObjectId, required: true },
    permissoes: { type: [String], required: true },
    dateValidade: Date,
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('QRCode', QRCodeSchema);