const ids = [
    'Nome',
    'Sobrenome',
    'RG',
    'Orgao',
    'DataExp',
    'CPF',
    'NomePai',
    'NomeMae',
    'DataNasc',
    'LocalNasc',
    'EstadoCiv',
    'Telefone',
    'Email',
    'Endereco',
    'Sexo',
    'Raca',
    'Nacionalidade',
    'Deficiencia',
    'Trabalho',
    'Renda',
    'Dependentes',
    'Pis',
    'Plano',
    'NumPlano',
    'Vencimento',
    'Nicotina',
    'Alcool',
    'Ilicitas',
    'Remedio',
    'Alergias',
    'TipoSanguineo',
    'Bio'
];

/**
 * Responsável por criar um qr code do usuário, percorre um array de todos os ids de checkboxes e verifica quais estão selecionados. Caso estejam,
 * a é concatenada no array de permissões. No fim da checagem, é feito o post na rota /qrcodes do servidor.
 */
async function criaQRCode(){
    const permissoes = [];
    const accesstoken = localStorage.getItem('accessToken');
    ids.map(id => {
        if(document.getElementById(`check${id}`).checked)
            permissoes.push(id);
    });
    
    try{
    const response = await api.post('/qrcodes', { permissoes }, { headers: { accesstoken }});
    } catch(err){
        console.log(err);
        alert('Criação de QR Code falhou');
        return;
    }

    alert('QR Code criado com sucesso!');
    document.location.href = 'qrcodes.html';
}

document.getElementById('criar').addEventListener('click', criaQRCode);