/**
 * Responsável por buscar os qr codes de um usuário no servidor e exibir na página. Primeiramente a função busca o token de acesso do usuário,
 * em seguida ela faz um get na rota /qrcodes com este token de acesso. O próprio servidor é responsável por decodificar o token e descobrir quem é
 * o usuário e retornar os qr codes corretos. O array de qr codes é mapeado e mostrado em html na página.
 */
async function buscaCodigos(){
    const accessToken = localStorage.getItem('accessToken');

    let { data } = await api.get('/qrcodes', { headers: { accessToken } });
    data = JSON.parse(decrypt(data.data))

    const elemento = document.getElementById('codigos');
    elemento.innerHTML = '<h1 class="text-center">QRCodes</h1>';
    data.map(qrcode => {
        const date = new Date(qrcode.createdAt);
        elemento.innerHTML += `
            <div class="row mt-5" id="${qrcode._id}">
                <div  class="col-sm-4 qrcode" onClick="updateModal('${qrcode._id}')" data-toggle="modal" data-target="#modalQRCode" style="background-image: url('https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${qrcode._id}&choe=UTF-8')"></div>
                <div class="col-sm-6 qrcode-details d-flex flex-column justify-content-center">
                    <b>Data criação</b>${date.toLocaleDateString()}<br>
                </div>
                <div class="col-sm-2 d-flex flex-column justify-content-center">
                    <button type="button" class="btn btn-primary" name="botaoDeletar" onclick="deletarQrCode('${qrcode._id}')">
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

/**
 * Função usada para deletar um qr code, a partir do seu id. Para isso, faz-se um DELETE na rota /qrcodes
 * 
 * @param {string} _id - id do qrcode a ser deletado
 */
async function deletarQrCode(_id){
    const accesstoken = localStorage.getItem('accessToken');
    if(confirm('Você tem certeza que deseja excluir este qr code? Não tem volta!')){
        const res = await api.delete('/qrcodes', { headers: { accesstoken }, data: { _id } });
        buscaCodigos();
    }
}

/**
 * Função usada para limpar todos os qr codes de um usuário.
 */
async function limparQrCodes(){
    const accesstoken = localStorage.getItem('accessToken');
    if(confirm('Você tem certeza que deseja limpar seus qr codes? Não tem volta mesmo!')){
        const res = await api.delete('/qrcodes', { headers: { accesstoken }});
        document.location.href = '/criarQRCode.html';
    }
}

/**
 * Função usada para colocar o QR Code grande no modal
 * 
 * @param {string} _id - id do qr code
 */
function updateModal(_id){
    document.getElementById('codigo').innerHTML = `<img src="https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${_id}&choe=UTF-8"/>`
}

buscaCodigos();
document.getElementById('buttonLimpar').addEventListener('click', limparQrCodes);