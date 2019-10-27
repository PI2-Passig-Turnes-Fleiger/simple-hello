async function logar(){
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try{
        const response = await api.post('/login', { email, senha });
        localStorage.setItem('access-token', response.data.token);
    } catch(err){
        const {data} = err.response
        console.log('erro:', data);
    }
}

document.getElementById('loginEntrar').addEventListener('click', logar);