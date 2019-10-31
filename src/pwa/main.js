const page = location.href.split("/").slice(-1)[0];
const requiresLogin = [
    'criarQRCode.html',
    'qrcodes.html',
    'signup-info.html'
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

updateNav(accessToken);

function updateNav(accessToken){
    if(accessToken){
        navbar.innerHTML = `
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/">HOME <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/criarQRCode.html">CRIAR QR CODE</a>
                    <a class="nav-item nav-link" href="/qrcodes.html">SEUS QR CODES</a>
                    <a class="nav-item nav-link" href="/signup-info.html">VOCÊ</a>
                    <a class="nav-item nav-link" href="#" id="logout">SAIR</a>
                </div>
            </div>

            <a class="navbar-brand" href="#">SIMPLE HELLO</a>
        `
    } else{
        navbar.innerHTML = `
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/">HOME <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" data-toggle="modal" data-target="#modalLoginForm">FAÇA LOGIN</a>
                    <a class="nav-item nav-link" href="signup.html">CADASTRE-SE</a>
                </div>
            </div>

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