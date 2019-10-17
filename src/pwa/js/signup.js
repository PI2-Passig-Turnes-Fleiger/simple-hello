async function registraUsuario(){
    const nome = document.getElementById('InputNome').value;
    const sobrenome = document.getElementById('InputSobrenome').value;
    const email = document.getElementById('InputEmail1').value;
    const cpf = document.getElementById('InputCpf').value;
    const senha = document.getElementById('InputPassword1').value;
    const confirmar_senha = document.getElementById('InputPassword2').value;
    
    const res = await api.post('/users', { nome, sobrenome, email, cpf, senha, confirmar_senha })
    console.log(res);
}

document.getElementById('cadastrar').addEventListener('click', registraUsuario)