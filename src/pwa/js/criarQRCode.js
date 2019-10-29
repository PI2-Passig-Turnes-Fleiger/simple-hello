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