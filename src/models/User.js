const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    senha: { type: String, required: true },
    tipo: { type: String, required: true },
    cpf: { type: String, required: false },
    cnpj: { type: String, required: false },
    
});

mongoose.model('User', UserSchema);