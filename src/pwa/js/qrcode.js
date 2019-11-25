const { _id } = getUrlVars();

/**
 * Função usada para fazer um post na rota /accesscliente com o _id passado pelo parâmetro da url
 */
async function acessaQRCode(){
    if(accessToken){
        await api.post('/accesscliente', { _id }, { headers: { accessToken } });
    } else{
        alert('Faça login primeiro!');
        document.location.href=`/index.html?_id=${_id}`
        return
    }
    
    document.location.href='/outrosQRCodes.html'
}
acessaQRCode();
