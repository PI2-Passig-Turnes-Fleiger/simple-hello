const todos = [
    'Nome',          // 0
    'Sobrenome',     // 1
    'RG',            // 2
    'Orgao',         // 3
    'DataExp',       // 4
    'CPF',           // 5
    'CNPJ',          // 6
    'NomePai',       // 7
    'NomeMae',       // 8
    'DataNasc',      // 9
    'LocalNasc',     // 10
    'EstadoCiv',     // 11
    'Telefone',      // 12
    'Email',         // 13
    'Endereco',      // 14
    'Sexo',          // 15
    'Raca',          // 16
    'Nacionalidade', // 17
    'Deficiencia',   // 18
    'Trabalho',      // 19
    'Renda',         // 20
    'Dependentes',   // 21
    'Pis',           // 22
    'Plano',         // 23
    'NumPlano',      // 24
    'Vencimento',    // 25
    'Nicotina',      // 26
    'Alcool',        // 27
    'Ilicitas',      // 28
    'Remedio',       // 29
    'Alergias',      // 30
    'TipoSanguineo', // 31
    'Bio'            // 32
];

const clinicas = [0, 1, 2, 5, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const contratos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 30];
const portarias = [0, 1, 5, 9, 12, 13, 15, 16];

function limpaSelecoes(){
    todos.forEach(id => document.getElementById(`check${id}`).checked = false);
}

function modelo(idsSelecao){
    limpaSelecoes();
    idsSelecao.forEach(indexId => document.getElementById(`check${todos[indexId]}`).checked = true);
}

document.getElementById('buttonContrato').addEventListener('click', () => modelo(contratos));   // Uso de arroy function para o event listener porque se passar a função
document.getElementById('buttonClinicas').addEventListener('click', () => modelo(clinicas));    // ela é chamada apenas uma vez, quando a página é carregada.
document.getElementById('buttonPortaria').addEventListener('click', () => modelo(portarias));   // Desta maneira, a função é chamada em todos os cliques com o parâmetro correto.