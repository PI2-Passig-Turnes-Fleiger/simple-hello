const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const encryption = require('../encryption');
const Key = mongoose.model('Key');


module.exports = {

    /**
     * Responsável por criar um usuário. Lê da requisição o nome, sobrenome, email, cpf, senha e confirmação de senha e cria um novo usuário no banco de dados.
     *
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
    async store(req, res){
        let { data } = req.body;
        let { id } = req.headers;
        data = JSON.parse(await encryption.decrypt(data));

        let { nome, sobrenome, email, cpf, senha, confirmar_senha } = data;
        if(!nome || !sobrenome || !email || !cpf || !senha || !confirmar_senha)
            return res.status(400).send('Campos incompletos!');
        if(senha != confirmar_senha)
            return res.status(400).send('Senhas não conferem!');
        if(await User.findOne({ email }))
            return res.status(400).send('uje');

        senha = await encryption.encrypt(id + ';' + senha)

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
        const decryptedData = JSON.parse(await encryption.decrypt(data));
        const { email, senha } = decryptedData;

        const user = await User.findOne({ email });

        if(!user)
            return res.status(401).send('une');

        const senha2 = await encryption.decrypt(user.senha)
        
            if(senha2 !== senha)
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
        data = JSON.parse(await encryption.decrypt(data));

        const user = await User.findById(userId);

        const changes = {}

        Object.entries(data).forEach(([key, value]) => {
            if(typeof user[key] === 'boolean'){
                value = value ==='true';
            } else if(typeof user[key] === 'object'){
                value = new Date(value);
                user[key] = new Date(user[key]);
                if(user[key].getTime() !== value.getTime()){
                    changes[key] = value;
                    keys.push(key);
                }
                return;
            }

            if(user[key] != value)
                changes[key] = value;
        });

        await User.updateOne({ '_id': userId}, changes);
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
        const { id } = req.headers;
        
        const user = await User.findById(userId)
        const encryptedUser = await encryption.encrypt(id + ';' +JSON.stringify(user));
        res.json({ data: encryptedUser });
    }
};