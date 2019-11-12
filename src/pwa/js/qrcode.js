function getUrlVars() {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const { _id } = getUrlVars();

async function acessaQRCode(){
    const ac = await api.post('/accesscliente', { _id }, { headers: { accessToken } });
    
    document.location.href='/outrosQRCodes.html'
}
acessaQRCode();
