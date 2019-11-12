const clinicas = [0, 1, 2, 5, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const contratos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 30];
const portarias = [0, 1, 5, 9, 12, 13, 15, 16];

/**
 * Responsável por limpar todas as seleções do formulário, para garantir que os modelos funcionarão corretamente.
 */
function limpaSelecoes(){
    todos.forEach(id => document.getElementById(`check${id}`).checked = false);
}

/**
 * Reponsável por pré-selecionar os checkboxes do formulário na página. Usando um array grande com todos os ids dos checkboxes, ela
 * recebe um array de índices para selecionar.
 * 
 * Desta maneira há mais flexibilidade para criar outros modelos.
 * 
 * @param {array} idsSelecao - Array com os índices para a função percorrer e escolher do array com todos os ids.
 */
function modelo(idsSelecao){
    limpaSelecoes();
    idsSelecao.forEach(indexId => document.getElementById(`check${todos[indexId]}`).checked = true);
}

document.getElementById('buttonContrato').addEventListener('click', () => modelo(contratos));   // Uso de arrow function para o event listener porque se passar a função
document.getElementById('buttonClinicas').addEventListener('click', () => modelo(clinicas));    // ela é chamada apenas uma vez, quando a página é carregada.
document.getElementById('buttonPortaria').addEventListener('click', () => modelo(portarias));   // Desta maneira, a função é chamada em todos os cliques com o parâmetro correto.