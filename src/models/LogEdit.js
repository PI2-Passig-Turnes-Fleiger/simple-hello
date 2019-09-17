const mongoose = require('mongoose');

const LogEditSchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    _idUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    campos: { type: [String], required: true },
    // Não sei se vale deixar o valor default
    date: { type: Date, default: Date.now }
});

mongoose.model('LogEdit', LogEditSchema);