function registraUsuario(){
    const nome = document.getElementById('InputNome').value;
    const sobrenome = document.getElementById('InputSobrenome').value;
    const email = document.getElementById('InputEmail1').value;
    const cpf = document.getElementById('InputCpf').value;
    const senha = document.getElementById('InputPassword1').value;
    const confirma_senha = document.getElementById('InputPassword2').value;
    console.log(nome, sobrenome, email, cpf, senha, confirma_senha);
}

document.getElementById('cadastrar').addEventListener('click', registraUsuario)