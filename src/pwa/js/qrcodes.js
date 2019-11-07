/**
 * Responsável por buscar os qr codes de um usuário no servidor e exibir na página. Primeiramente a função busca o token de acesso do usuário,
 * em seguida ela faz um get na rota /qrcodes com este token de acesso. O próprio servidor é responsável por decodificar o token e descobrir quem é
 * o usuário e retornar os qr codes corretos. O array de qr codes é mapeado e mostrado em html na página.
 */
async function buscaCodigos(){
    const accessToken = localStorage.getItem('accessToken');

    const { data } = await api.get('/qrcodes', { headers: { accessToken } });
    const elemento = document.getElementById('codigos');
    elemento.innerHTML = '';
    data.map(qrcode => {
        const date = new Date(qrcode.createdAt);
        elemento.innerHTML += `
            <div class="row mt-5" id="${qrcode._id}">
                <div class="col-sm-4 qrcode" data-toggle="modal" data-target="#modalQRCode"></div>
                <div class="col-sm-6 qrcode-details d-flex flex-column justify-content-center">
                    <b>Data criação</b>${date.toLocaleDateString()}<br>
                </div>
                <div class="col-sm-2 d-flex flex-column justify-content-center">
                    <button type="button" class="btn" name="botaoDeletar" onclick="deletarQrCode('${qrcode._id}')">
                        Deletar
                    </button>
                </div>
            </div>  
            `;

        const campos = document.getElementById(qrcode._id).getElementsByTagName('div')[1];
        campos.innerHTML += '<b>Campos</b>';
        qrcode.permissoes.map(permissao => campos.innerHTML += `${permissao}, `);

        campos.innerHTML = campos.innerHTML.substr(0, campos.innerHTML.length-2);
    });
}

async function deletarQrCode(_id){
    const accesstoken = localStorage.getItem('accessToken');
    if(confirm('Você tem certeza que deseja excluir este qr code? Não tem volta!')){
        const res = await api.delete('/qrcodes', { headers: { accesstoken }, data: { _id } });
        buscaCodigos();
    }
}

buscaCodigos();