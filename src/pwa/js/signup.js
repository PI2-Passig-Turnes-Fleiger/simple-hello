async function registraUsuario(){
    const nome = document.getElementById('InputNome').value;
    const sobrenome = document.getElementById('InputSobrenome').value;
    const email = document.getElementById('InputEmail1').value;
    const cpf = document.getElementById('InputCpf').value;
    const senha = document.getElementById('InputPassword1').value;
    const confirmar_senha = document.getElementById('InputPassword2').value;

    if(!nome || !sobrenome || !email || !cpf || !senha || !confirmar_senha){
        alert('Campos incompletos!');
        return;
    }

    if(senha !== confirmar_senha){
        alert('As senhas não conferem!');
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

document.getElementById('cadastrar').addEventListener('click', registraUsuario)