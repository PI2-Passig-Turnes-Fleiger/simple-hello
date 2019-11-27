const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    key: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('Key', KeySchema);