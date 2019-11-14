const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const encryption = require('../encryption');


module.exports = {

    /**
     * Responsável por criar um usuário. Lê da requisição o nome, sobrenome, email, cpf, senha e confirmação de senha e cria um novo usuário no banco de dados.
     *
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
    async store(req, res){
        let { data } = req.body;
        data = JSON.parse(encryption.decrypt(data));

        let { nome, sobrenome, email, cpf, senha, confirmar_senha } = data;
        if(!nome || !sobrenome || !email || !cpf || !senha || !confirmar_senha)
            return res.status(400).send('Campos incompletos!');
        if(senha != confirmar_senha)
            return res.status(400).send('Senhas não conferem!');
        if(await User.findOne({ email }))
            return res.status(400).send('uje');

        senha = encryption.encrypt(senha)

        const user = await User.create({ nome, sobrenome, senha, tipo: 'pf', cpf, email })

        return res.status(201).json(user);
    },

    /**
     * Responsável por autenticar um usuário. Recebe na requisição o email e senha do usuário e o busca no banco, respondendo com erro
     * caso ele não exista ou caso a senha esteja errada e respondendo com sucesso com o JWT de autenticação.
     *
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
    async login(req, res){
        const { data } = req.body;
        const decryptedData = JSON.parse(encryption.decrypt(data));
        const { email, senha } = decryptedData;

        const user = await User.findOne({ email });

        const senha2 = encryption.decrypt(user.senha)

        if(!user)
            res.status(401).send('une');
        else if(senha2 !== senha)
            res.status(401).send('eas');
        else{
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ auth: true, token });
        }
    },

    /**
     * Responsável por atualizar as informações do usuário. Pega todas as informações do corpo da req e atualiza o usuário no banco de dados.
     * O id do usuário é recebido através do JWT.
     *
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
    async info(req, res){
        const { userId } = req;

        let { data } = req.body;
        data = JSON.parse(encryption.decrypt(data));

        await User.updateOne({ "_id": userId}, data);
        return res.json(true);
    },

    /**
     * Responsável por devolver todos os dados de um usuário. Ela busca todos os dadis a partir do ID de usuário recebido pelo JWT
     * e devolve um JSON.
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada pelo servidor
     */
    async index(req, res){
        const { userId } = req;
        const user = await User.find({ _id: userId })

        const encryptedUser = encryption.encrypt(JSON.stringify(user));
        res.json({ data: encryptedUser });
    }


};