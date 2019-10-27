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
        if(!user || user.senha !== senha)
            res.status(500).send('Login inválido!');
        else{
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: 3000 });
            res.json({ auth: true, token });
        }
    },

    logout(req, res){
        res.json({ auth: false, token: null});
    },

    verifyJWT(req, res, next){
        const token = req.headers['access-token'];

        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            req.userId = decoded._id;
            next();
        });
    }
};