const staticAssets = [
    './',
    './criarQRCode.html',
    './qrcodes.html',
    './signup-info.html',
    './signup.html',
    './css/estilo.css',
    './js/services/api.js',
    './js/modelos.js',
    './js/signup.js',
    './js/login.js',
    './js/criarQRCode.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open('simple-hello-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.origin){
         event.respondWith(cacheFirst(req));
    } else{
        event.respondWith(networkFirst(req));
    }
});

/**
 * Função para tentar buscar algo primeiro pelo cache e, caso não exista, buscar pela rede.
 * 
 * @param {string} req - Algo a ser encontrado
 */
async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

/**
 * Função para tentar buscar algo primeiro na rede e, caso não tenha conexão, tentar buscar em cache.
 * @param {string} req - Algo a ser encontrado
 */
async function networkFirst(req){
    const cache = await caches.open('simple-hello-dynamic');
    try{
        const res = await fetch(req);
        cache.put(res, res.clone());
        return res;
    } catch(err){
        return await cache.match(req);
    }
}