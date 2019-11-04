/**
 * Responsável por registrar um usuário no backend. Primeiramente busca todos os dados do formulário na página e, em seguida, envia um post para o servidor.
 */

$( "#form" ).submit(function( event ) {
    registraUsuario();
})

async function registraUsuario(){
    const nome = document.getElementById('InputNome').value;
    const sobrenome = document.getElementById('InputSobrenome').value;
    const email = document.getElementById('InputEmail1').value;
    const cpf = document.getElementById('InputCpf').value;
    const senha = document.getElementById('InputPassword1').value;
    const confirmar_senha = document.getElementById('InputPassword2').value;

    if(!validaCPF(cpf)){
        alert('CPF Inválido!');
        return;
    }

    if(senha != confirmar_senha){
        alert("Senhas não conferem!")
        return;
    }

    let res;
    try{
        res = await api.post('/users', { nome, sobrenome, email, cpf, senha, confirmar_senha });
    } catch(err){
        if(err.response === 'uje'){
            alert('Usuário já existe!');
            return;
        }
    }
    
    window.location.href = '/';
}

//document.getElementById('cadastrar').addEventListener('submit', registraUsuario)