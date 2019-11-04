/**
 * Responsável por autenticar um usuário no servidor. Ela busca o email e a senha do usuário e envia um post na rota /login,
 * recebendo o token e o guardando no localStorage do navegador para uso posterior
 */

$( "#login" ).submit(function( event ) {
    logar();
})

async function logar(){
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try{
        const response = await api.post('/login', { email, senha });
        localStorage.setItem('accessToken', response.data.token);
        document.location.href = '/'
    } catch(err){
        const { data } = err.response
        console.log('erro:', data);
    }
}

//document.getElementById('loginEntrar').addEventListener('click', logar);