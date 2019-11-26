/**
 * Responsável por criar um qr code do usuário, percorre um array de todos os ids de checkboxes e verifica quais estão selecionados. Caso estejam,
 * a é concatenada no array de permissões. No fim da checagem, é feito o post na rota /qrcodes do servidor.
 */
async function criaQRCode(){
    const permissoes = [];
    const accesstoken = localStorage.getItem('accessToken');
    todos.map(id => {
        if(document.getElementById(`check${id}`) && document.getElementById(`check${id}`).checked){
            if(id === 'Alergias'){
                permissoes.push('alergiaMedicamentos');
                permissoes.push('alergiaAlimentos');
                permissoes.push('alergiaEquipamento');
            } else if(id === 'Endereco'){
                permissoes.push('cep');
                permissoes.push('numero');
                permissoes.push('complemento');
            } else
                permissoes.push(id);
        }
    });
    permissoes.push('nome');
    permissoes.push('sobrenome');
    
    try{
        const encryptedPermissoes = encrypt(JSON.stringify(permissoes));

        const response = await api.post('/qrcodes', { data: encryptedPermissoes }, { headers: { accesstoken }});
    } catch(err){
        console.log(err);
        alert('Criação de QR Code falhou');
        return;
    }

    alert('QR Code criado com sucesso!');
    document.location.href = 'qrcodes.html';
}

document.getElementById('criar').addEventListener('click', criaQRCode);