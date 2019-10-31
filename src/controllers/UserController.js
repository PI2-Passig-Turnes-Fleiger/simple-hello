const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

module.exports = {
    /**
     * Responsável por criar um usuário. Lê da requisição o nome, sobrenome, email, cpf, senha e confirmação de senha e cria um novo usuário no banco de dados.
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
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

    /**
     * Responsável por autenticar um usuário. Recebe na requisição o email e senha do usuário e o busca no banco, respondendo com erro
     * caso ele não exista ou caso a senha esteja errada e respondendo com sucesso com o JWT de autenticação.
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
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
    },

    /**
     * Responsável por atualizar as informações do usuário. Pega todas as informações do corpo da req e atualiza o usuário no banco de dados.
     * O id do usuário é recebido através do JWT.
     * 
     * @param {*} req - Requisição recebida pelo servidor
     * @param {*} res - Resposta a ser dada
     */
    async info(req, res){
        const {sexo, raca, nacionalidade, deficiencia, trabalho, renda, dependentes, rg, orgaoExpedidor, dataExpedicao, pisPasep, nomePai, nomeMae,dataNascimento,localNascimento, estadoCivil, telefone, email, cep, numero, complemento, planoDeSaude, numeroCartaoPlano, vencimentoCartaoPlano, cigarro,
            alcool, drogasIlicitas, remedios, medicamentos, alimentos, equipamento, tipoSanguineo, bio} = req.body;

        let user = new User({
            sexo: sexo,
            raca:raca ,
            nacionalidade: nacionalidade,
            deficiencia: deficiencia,
            trabalho: trabalho,
            renda: renda,
            dependentes: dependentes,
            rg: rg,
            orgaoExpedidor: orgaoExpedidor,
            dataExpedicao: dataExpedicao,
            pisPasep: pisPasep,
            nomePai: nomePai,
            nomeMae: nomeMae,
            dataNascimento: dataNascimento,
            localNascimento: localNascimento,
            estadoCivil: estadoCivil,
            telefone: telefone,
            email: email,
            cep: cep,
            numero: numero,
            complemento: complemento,
            planoDeSaude: planoDeSaude,
            numeroCartaoPlano: numeroCartaoPlano,
            vencimentoCartaoPlano: vencimentoCartaoPlano,
            cigarro: cigarro,
            alcool: alcool,
            drogasIlicitas: drogasIlicitas,
            remedios: remedios,
            medicamentos: medicamentos,
            alimentos:alimentos ,
            equipamento:equipamento ,
            tipoSanguineo: tipoSanguineo,
            bio:bio
        });

        /*User.findOneAndUpdate({
            _id: mongoose.Types.ObjectId("5dba3d078cf8c510245dce97")
        }, user, { upsert: true }, function(err, res) {

        });*/
        const { userId } = req;
        doc = {}


        User.findById(userId, function(err, doc) {
            if (err) {
                console.error('error, no entry found');
            }

            if(sexo) doc.sexo = sexo;
            if(raca) doc.raca =raca ;
            if(nacionalidade) doc.nacionalidade = nacionalidade;
            if(deficiencia) doc.deficiencia = deficiencia;
            if(trabalho) doc.trabalho = trabalho;
            if(renda) doc.renda = renda;
            if(dependentes) doc.dependentes = dependentes;
            if(rg) doc.rg= rg;
            if(orgaoExpedidor) doc.orgaoExpedidor= orgaoExpedidor;
            if(dataExpedicao) doc.dataExpedicao= dataExpedicao;
            if(pisPasep) doc.pisPasep= pisPasep;
            if(nomePai) doc.nomePai= nomePai;
            if(nomeMae) doc.nomeMae= nomeMae;
            if(dataNascimento) doc.dataNascimento= dataNascimento;
            if(localNascimento) doc.localNascimento= localNascimento;
            if(estadoCivil) doc.estadoCivil= estadoCivil;
            if(telefone) doc.telefone= telefone;
            if(email) doc.email= email;
            if(cep) doc.endereço.cep = cep;
            if(numero) doc.endereco.numero= numero;
            if(complemento) doc.endereco.complemento= complemento;
            if(planoDeSaude) doc.planoDeSaude= planoDeSaude;
            if(numeroCartaoPlano) doc.numeroCartaoPlano= numeroCartaoPlano;
            if(vencimentoCartaoPlano) doc.vencimentoCartaoPlano= vencimentoCartaoPlano;
            if(cigarro) doc.dadosDrogas.cigarro = cigarro;
            if(alcool) doc.dadosDrogas.alcool= alcool;
            if(drogasIlicitas) doc.dadosDrogas.drogasIlicitas = drogasIlicitas;
            if(remedios) doc.dadosDrogas.remedios = remedios;
            if(medicamentos) doc.dadosAlergias.medicamentos = medicamentos;
            if(alimentos) doc.dadosAlergias.alimentos = alimentos;
            if(equipamento) doc.dadosAlergias.equipamento= equipamento;
            if(tipoSanguineo) doc.tipoSanguineo= tipoSanguineo;
            if(bio) doc.bio=bio;

            doc.save();
        })

        return res.json(user);
    }
};