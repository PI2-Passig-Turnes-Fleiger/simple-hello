const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', UserSchema);