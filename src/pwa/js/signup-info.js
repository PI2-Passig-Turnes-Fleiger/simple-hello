$( "#signup-info" ).submit(function( e ) {

    let x = $( this ).serializeArray();
    var array = {};

    $.map(x, function(n, i){
        if(n['value'] != "" && n['value'] != "undefined") {
            if(n['name'] == "renda"){
                n['value'] = converteMoedaFloat(n['value']);
            }
            array[n['name']] = n['value'];
        }
    });
    atualizaUsuario(array);
})

/**
 * Responsável por atualizar os dados de um usuário. A função busca todos os dados do formulário na página e os envia para o servidor, com um post na rota /userInfo
 */
async function atualizaUsuario(x) {
    let res;
    try {
        const data = encrypt(JSON.stringify(x));
        res = await api.post('/usersInfo', { data }, { headers: { accessToken } } );
    } catch (err) {
        alert('Erro!' + err );
        return;
    }
    alert("Informações atualizadas com sucesso!")

}

/**
 * Função responsável por buscar as informações do usuário no banco, para popular o formulário.
 */
async function buscaInfos() {
    const accessToken = localStorage.getItem('accessToken');
    const id = localStorage.getItem('encryption_key').split(';')[0];

    let { data } = await api.get('/usersInfo', { headers: { accessToken, id } });
    data = JSON.parse(decrypt(data.data));
    
    document.getElementById("nome_pessoa").innerHTML = data.nome + " " + data.sobrenome;
    Object.keys(data).forEach(key => {
        let elemento = document.getElementsByName(key)[0];
        if(elemento) {
            if(key == "renda")
                data[key] = converteFloatMoeda(data[key])
            
            if(key == "dataNascimento" || key == "dataExpedicao" || key == "vencimentoCartaoPlano"){
                let date = formataData(data[key]);
                data[key] = date;
            }
            elemento.value = data[key];
        }
    });
}

buscaInfos()