const mongoose = require('mongoose');
const Key = mongoose.model('Key');
const CryptoJS = require('crypto-js');

module.exports = {
    async store(req, res){
        const key = CryptoJS.lib.WordArray.random(16).toString();
        
        const chave = await Key.create({ key });
        return res.json(chave);
    }
};