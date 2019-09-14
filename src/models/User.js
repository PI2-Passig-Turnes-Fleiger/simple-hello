const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // _id não é necessário, o próprio banco de dados o cria.
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    senha: { type: String, required: true },
    tipo: { type: String, required: true },
    cpf: { type: String, required: false },
    cnpj: { type: String, required: false },
    sexo: String,
    raca: String,
    nacionalidade: String,
    deficiencia: [String],
    trabalho: String,
    renda: Number,
    dependentes: Number,
    pictureFilename: String,
    rg: String,
    orgaoExpedidor: String,
    dataExpedicao: Date,
    pisPasep: String,
    nomePai: String,
    nomeMae: String,
    dataNascimento: Date,
    localNascimento: String,
    estadoCivil: String,
    telefone: String,
    email: String,
    endereço: {
        cep: String,
        numero: Number,
        complemento: String
    },
    planoDeSaude: String,
    numeroCartaoPlano: String,
    vencimentoCartaoPlano: Date,
    dadosDrogas: {
        cigarro: Boolean,
        alcool: Boolean,
        drogasIlicitas: [String],
        remedios: [String]
    },
    dadosAlergias: {
        medicamentos: String,
        alimentos: String,
        equipamento: String
    },
    tipoSanguineo: String,
    bio: String
});

mongoose.model('User', UserSchema);