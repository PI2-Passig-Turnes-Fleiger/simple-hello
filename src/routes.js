const express = require('express');
const jwt = require('jsonwebtoken');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const QRController = require('./controllers/QRController');

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

routes.post('/login', UserController.login);

routes.post('/qrcodes', verifyJWT, QRController.store);


module.exports = routes;