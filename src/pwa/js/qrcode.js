/**
 * Função usada para recuperar os parâmetros de URL.
 */
function getUrlVars() {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const { _id } = getUrlVars();

/**
 * Função usada para fazer um post na rota /accesscliente com o _id passado pelo parâmetro da url
 */
async function acessaQRCode(){
    const ac = await api.post('/accesscliente', { _id }, { headers: { accessToken } });
    
    document.location.href='/outrosQRCodes.html'
}
acessaQRCode();
