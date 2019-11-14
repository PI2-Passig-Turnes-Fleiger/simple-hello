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
            </div>  
            `;

        const campos = document.getElementById(access._idQRCode._id).getElementsByTagName('div')[1];

        campos.innerHTML += '<b>Campos</b>';
        access._idQRCode.permissoes.map(permissao => campos.innerHTML += `${permissao}, `);

        campos.innerHTML = campos.innerHTML.substr(0, campos.innerHTML.length-2);
    });
}

async function populaModal(_id){
    let { data } = await api.get('/qrcodes/info', { headers: { accessToken }, params: { _id } });

    data = JSON.parse(decrypt(data.data));

    const modal = document.getElementById('modalInfos');
    modal.getElementsByTagName('h4')[0].innerHTML = `${data.nome} ${data.sobrenome}`;

    const body = modal.getElementsByClassName('modal-body')[0];
    body.innerHTML = '';

    for(const [key, value] of Object.entries(data)){
        if(key !== '_id' && key !== 'nome' && key !== 'sobrenome'){
            if(key.includes('data')){
                const nasc = new Date(value);
                body.innerHTML += `<h4>${key}: ${nasc.getDay()}/${nasc.getMonth()}/${nasc.getFullYear()}</h4>`;
            } else{
                body.innerHTML += `<h4>${key}: ${value}</h4>`;
            }
            
        }
    }
}
buscaOutrosCodigos();