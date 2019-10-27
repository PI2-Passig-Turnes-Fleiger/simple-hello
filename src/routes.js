const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/users', UserController.store);

routes.get('/login', UserController.login);
routes.get('/logout', UserController.verifyJWT, UserController.logout);


module.exports = routes;