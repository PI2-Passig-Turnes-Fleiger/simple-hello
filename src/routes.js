const express = require('express');
const jwt = require('jsonwebtoken');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const QRController = require('./controllers/QRController');

/**
 * Função usada para verificar a autenticação de um usuário. Ela deve ser usada em todas as rotas que precisam de autenticação.
 * Além de verificar o token, ela coloca decodifica o mesmo e insere o ID do usuário na requisição, para uso posterior.
 * 
 * @param {*} req - Requisição recebida pelo node
 * @param {*} res - Resposta para enviar caso a autenticação falhe
 * @param {*} next - Próxima função a ser chamada
 */
function verifyJWT(req, res, next){
    const token = req.headers['accesstoken'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded._id;
        next();
    });
}

routes.post('/users', UserController.store);
routes.post('/usersInfo', verifyJWT, UserController.info);

routes.post('/login', UserController.login);

routes.post('/qrcodes', verifyJWT, QRController.store);
routes.get('/qrcodes', verifyJWT, QRController.index);


module.exports = routes;