const page = location.href.split("/").slice(-1)[0];
const requiresLogin = [
    'criarQRCode.html',
    'qrcodes.html',
    'signup-info.html',
    'qrcode.html',
    'outrosQRCodes.html'
];

const todos = [
    'nome',                     // 0
    'sobrenome',                // 1
    'rg',                       // 2
    'orgaoExpedidor',           // 3
    'dataExpedicao',            // 4
    'cpf',                      // 5
    'cnpj',                     // 6
    'nomePai',                  // 7
    'nomeMae',                  // 8
    'dataNascimento',           // 9
    'localNascimento',          // 10
    'estadoCivil',              // 11
    'telefone',                 // 12
    'email',                    // 13
    'Endereco',                 // 14
    'sexo',                     // 15
    'raca',                     // 16
    'nacionalidade',            // 17
    'deficiencia',              // 18
    'trabalho',                 // 19
    'renda',                    // 20
    'dependentes',              // 21
    'pisPasep',                 // 22
    'planoDeSaude',             // 23
    'numeroCartaoPlano',        // 24
    'vencimentoCartaoPlano',    // 25
    'cigarro',                  // 26
    'alcool',                   // 27
    'drogasIlicitas',           // 28
    'remedios',                 // 29
    'Alergias',                 // 30
    'tipoSanguineo',            // 31
    'bio'                       // 32
];

if('serviceWorker' in navigator && page === ""){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('Registrado', reg);
        }).catch(err => {
            console.error(err);
        });
    });
}

const accessToken = localStorage.getItem('accessToken');
if(!accessToken && requiresLogin.includes(page))
    document.location.href = '/';

const navbar = document.getElementById('navbar');

/**
 * Função usada para recuperar os parâmetros de URL.
 */
function getUrlVars() {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

updateNav(accessToken);

/**
 * Atualiza o navbar para as versões de "logado" ou "deslogado", tendo diferentes funcionalidades.
 * 
 * @param {string} accessToken - JWT de acesso do usuário, podendo ser null ou undefined
 */
function updateNav(accessToken){
    if(accessToken){
        navbar.innerHTML = `
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/">HOME <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/criarQRCode.html">CRIAR QR CODE</a>
                    <a class="nav-item nav-link" href="/qrcodes.html">SEUS QR CODES</a>
                    <a class="nav-item nav-link" href="/signup-info.html">VOCÊ</a>
                    <a class="nav-item nav-link" href="/outrosQRCodes.html">OUTRAS PESSOAS</a>
                    <a class="nav-item nav-link" href="#" id="logout">SAIR</a>
                </div>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">SIMPLE HELLO</a>
        `
    } else{
        navbar.innerHTML = `
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/">HOME <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" data-toggle="modal" data-target="#modalLoginForm">FAÇA LOGIN</a>
                    <a class="nav-item nav-link" href="signup.html">CADASTRE-SE</a>
                </div>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">SIMPLE HELLO</a>
        `
    }
}

const logout = document.getElementById('logout');
if(logout){
    logout.addEventListener('click', async () => {
        localStorage.removeItem('accessToken')
        document.location.href = '/';
    });
}