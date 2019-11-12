/**
 * Responsável por atualizar os dados de um usuário. A função busca todos os dados do formulário na página e os envia para o servidor, com um post na rota /userInfo
 */

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
    console.log(array);
    atualizaUsuario(array);
})


async function atualizaUsuario(x) {
    let res;
    try {
        res = await api.post('/usersInfo', x, { headers: { accessToken } } );
    } catch (err) {
        alert('Erro!' + err );
        return;
    }
    alert("Informações atualizadas com sucesso!")

}

async function buscaInfos() {
    const accessToken = localStorage.getItem('accessToken');
    const { data } = await api.get('/usersInfo', { headers: { accessToken } });
    const dados = data[0];
    document.getElementById("nome_pessoa").innerHTML = data[0].nome + " " +
        data[0].sobrenome;
    Object.keys(dados).forEach(function(item){
        let elemento = document.getElementsByName(item)[0];
        if(elemento) {
            if(item == "renda"){
                dados[item] = converteFloatMoeda(dados[item])
            }
            if(item == "dataNascimento" || item == "dataExpedicao" || item == "vencimentoCartaoPlano"){
                let data = formataData(dados[item])
                dados[item] = data;
            }
            elemento.value = dados[item];
        }
    });
}

buscaInfos()