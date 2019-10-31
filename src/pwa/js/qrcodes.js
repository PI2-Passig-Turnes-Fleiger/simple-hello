/* <div class="row mt-5">
    <div class="col-sm-4 qrcode" data-toggle="modal" data-target="#modalQRCode"></div>
    <div class="col-sm-8 qrcode-details d-flex flex-column justify-content-center ">
        <b>Data criação</b>22/05/2019<br>
        <b>Campos</b>nome, sobrenome, idade, cpf...
    </div>                
</div> */

async function buscaCodigos(){
    const accessToken = localStorage.getItem('accessToken');
    const { data } = await api.get('/qrcodes', { headers: { accessToken } });
    const elemento = document.getElementById('codigos');
    
    data.map(qrcode => {
        const date = new Date(qrcode.createdAt);
        elemento.innerHTML += `
            <div class="row mt-5">
                <div class="col-sm-4 qrcode" data-toggle="modal" data-target="#modalQRCode"></div>
                <div class="col-sm-8 qrcode-details d-flex flex-column justify-content-center" id="${qrcode._id}">
                    <b>Data criação</b>${date.toLocaleDateString()}<br>
                </div>
            </div>  
            `;
        
        const campos = document.getElementById(qrcode._id);
        campos.innerHTML += '<b>Campos</b>';
        qrcode.permissoes.map(permissao => campos.innerHTML += `${permissao}, `);

        campos.innerHTML = campos.innerHTML.substr(0, campos.innerHTML.length-2);
    });
}

buscaCodigos();