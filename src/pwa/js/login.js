const { _id } = getUrlVars();

$( "#login" ).submit(function( event ) {
    logar();
})

/**
 * Responsável por autenticar um usuário no servidor. Ela busca o email e a senha do usuário e envia um post na rota /login,
 * recebendo o token e o guardando no localStorage do navegador para uso posterior
 */
async function logar(){
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try{
        const encryptedData = encrypt(JSON.stringify({ email, senha }))
        const response = await api.post('/login', { data: encryptedData });
        localStorage.setItem('accessToken', response.data.token);
        if(_id){
            document.location.href = `/QRCode.html?_id=${_id}`
        } else{
            document.location.href = '/'
        }
    } catch(err){
        const { data } = err.response
        console.log('erro:', data);
    }
}

//document.getElementById('loginEntrar').addEventListener('click', logar);