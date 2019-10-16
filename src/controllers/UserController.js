const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    async store(req, res) {
        const { nome, sobrenome, email, cpf, senha, confirmar_senha } = req.body;
        if(!nome || !sobrenome || !email || !cpf || !senha || !confirmar_senha){
            return res.status(403).send('Campos incompletos!');
        }
        if(senha != confirmar_senha){
            return res.status(403).send('Senhas não conferem!');
        }

        if(await User.findOne({ cpf })){
            return res.status(403).send('Usuário já existe!');
        }


        const user = await User.create({ nome, sobrenome, senha, tipo: 'pf', cpf })
        
        return res.json(user);
    }
};