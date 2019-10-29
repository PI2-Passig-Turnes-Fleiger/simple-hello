const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

module.exports = {
    async store(req, res){
        const { nome, sobrenome, email, cpf, senha, confirmar_senha } = req.body;
        if(!nome || !sobrenome || !email || !cpf || !senha || !confirmar_senha)
            return res.status(400).send('Campos incompletos!');
        if(senha != confirmar_senha)
            return res.status(400).send('Senhas não conferem!');
        if(await User.findOne({ email }))
            return res.status(400).send('uje');
        
        const user = await User.create({ nome, sobrenome, senha, tipo: 'pf', cpf, email })
        
        return res.status(201).json(user);
    },

    async login(req, res){
        const { email, senha } = req.body;

        const user = await User.findOne({ email });
        if(!user)
            res.status(401).send('une');
        else if(user.senha !== senha)
            res.status(401).send('eas');
        else{
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ auth: true, token });
        }
    }
};