/**
 * Função usada para buscar os QR Codes que um usuário leu e atualizar a interface na tela.
 */
async function buscaOutrosCodigos(){
    let { data } = await api.get('/qrcodes/outros', { headers: { accessToken } });
    data = JSON.parse(decrypt(data.data));
    
    const elemento = document.getElementById('codigos');
    elemento.innerHTML = '<h1 class="text-center">QRCodes que você leu!</h1>';
    data.map(access => {
        const date = new Date(access._idQRCode.createdAt);
        elemento.innerHTML += `
            <div class="row mt-5" id="${access._idQRCode._id}">
                <div class="col-sm-4 qrcode" onClick="populaModal('${access._id}')" data-toggle="modal" data-target="#modalInfos" style="background-image: url('https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${access._idQRCode._id}&choe=UTF-8')"></div>
                <div class="col-sm-6 qrcode-details d-flex flex-column justify-content-center">
                    <b>Data criação</b>${date.toLocaleDateString()}<br>
                    <b>Lido de</b>${access._idQRCode._idUser.nome} ${access._idQRCode._idUser.sobrenome}<br>
                </div>
                <div class="col-sm-2 d-flex flex-column justify-content-center">
                    <button type="button" class="btn btn-primary" name="botaoDeletar" onclick="deletarQrCode('${access._id}')">
                        Deletar
                    </button>
                </div>
            </div>  
            `;

        const campos = document.getElementById(access._idQRCode._id).getElementsByTagName('div')[1];

        campos.innerHTML += '<b>Campos</b>';
        access._idQRCode.permissoes.map(permissao => campos.innerHTML += `${permissao}, `);

        campos.innerHTML = campos.innerHTML.substr(0, campos.innerHTML.length-2);
    });
}

/**
 * Função usada para deletar um qr code lido, a partir do id do AccessCliente. Para isso, faz-se um DELETE na rota /qrcodes
 * 
 * @param {string} _id - id do qrcode a ser deletado
 */
async function deletarQrCode(_id){
    const accesstoken = localStorage.getItem('accessToken');
    if(confirm('Você tem certeza que deseja excluir este qr code? Não tem volta!')){
        const res = await api.delete('/accesscliente', { headers: { accesstoken }, data: { _id } });
        buscaOutrosCodigos();
    }
}

/**
 * Função usada para popular o modal na tela com as informações de outra pessoa.
 * 
 * @param {string} _id - id de um AccessCliente do banco de dados.
 */
async function populaModal(_id){
    let { data } = await api.get('/qrcodes/info', { headers: { accessToken }, params: { _id } });

    const { user, lastEdited } = JSON.parse(decrypt(data.data));

    const modal = document.getElementById('modalInfos');
    modal.getElementsByTagName('h4')[0].innerHTML = `${user.nome} ${user.sobrenome}`;

    const body = modal.getElementsByClassName('modal-body')[0];
    body.innerHTML = '';

    for(const [key, value] of Object.entries(user)){
        if(key !== '_id' && key !== 'nome' && key !== 'sobrenome'){
            if(key.includes('data')){
                const nasc = new Date(value);
                body.innerHTML += `<h4${lastEdited.includes(key)? ' style="color: red;"': ''}>${key}: ${nasc.getDay()}/${nasc.getMonth()}/${nasc.getFullYear()}</h4>`;
            } else{
                body.innerHTML += `<h4${lastEdited.includes(key)? ' style="color: red;"': ''}>${key}: ${value}</h4>`;
            }
            
        }
    }
}
buscaOutrosCodigos();