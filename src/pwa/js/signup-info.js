async function atualizaUsuario() {
    const sexo = document.getElementById('SelectSexo').value;
    const raca = document.getElementById('InputRaca').value;
    const nacionalidade = document.getElementById('InputNac').value;
    const deficiencia = document.getElementById('InputDeficiencia').value;
    const trabalho = document.getElementById('InputTrabalho').value;
    const renda = document.getElementById('InputRenda').value;
    const dependentes = document.getElementById('InputDependentes').value;
    //const pictureFilename = document.getElementById('').value;
    const rg = document.getElementById('InputRG').value;
    const orgaoExpedidor = document.getElementById('InputOrgao').value;
    const dataExpedicao = document.getElementById('InputDataExp').value;
    const pisPasep = document.getElementById('InputPis').value;
    const nomePai = document.getElementById('InputPai').value;
    const nomeMae = document.getElementById('InputMae').value;
    const dataNascimento = document.getElementById('InputDataNasc').value;
    const localNascimento = document.getElementById('InputLocNasc').value;
    const estadoCivil = document.getElementById('SelectEstCiv').value;
    const telefone = document.getElementById('InputTelefone').value;
    const email = document.getElementById('InputEmail').value;
    const cep = document.getElementById('InputCEP').value;
    const numero = document.getElementById('InputNumero').value;
    const complemento = document.getElementById('InputComplemento').value;
    const planoDeSaude = document.getElementById('InputPlanoSau').value;
    const numeroCartaoPlano = document.getElementById('InputNumeroPlano').value;
    const vencimentoCartaoPlano = document.getElementById('InputVencimentoPlano').value;
    const cigarro = document.getElementById('InputFumante').value;
    const alcool = document.getElementById('InputBebe').value;
    const drogasIlicitas = document.getElementById('InputZeDroguinha').value;
    const remedios = document.getElementById('InputRemedio').value;
    const medicamentos = document.getElementById('InputRemedioAlergia').value;
    const alimentos = document.getElementById('InputAlimentoAlergia').value;
    const equipamento = document.getElementById('InputEquipamentoAlergia').value;
    const tipoSanguineo = document.getElementById('SelectTipoSanguieno').value;
    const bio = document.getElementById('InputBio').value;
    let res;
    try {
        res = await api.post('/usersInfo', {sexo, raca, nacionalidade, deficiencia, trabalho, renda, dependentes, rg, orgaoExpedidor, dataExpedicao, pisPasep,
            nomePai, nomeMae,dataNascimento,localNascimento, estadoCivil, telefone, email, cep, numero, complemento, planoDeSaude, numeroCartaoPlano, vencimentoCartaoPlano, cigarro,
            alcool, drogasIlicitas, remedios, medicamentos, alimentos, equipamento, tipoSanguineo, bio}, { headers: { accessToken } } );
    } catch (err) {
        alert('Erro!' + err );
        return;
    }
    alert("Informações atualizadas com sucesso!")
    //window.location.href = '/';

}
