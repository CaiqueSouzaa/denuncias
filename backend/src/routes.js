const { Router } = require('express');
const { body, param } = require('express-validator');

// Middlewares
const jwtAuth = require('./app/middlewares/jwtAuth.js');
const catchError = require('./app/middlewares/catchError.js');

// Controllers
const DenunciasController = require('./app/controllers/DenunciasController.js');
const SessionController = require('./app/controllers/SessionController.js');
const UsersController = require('./app/controllers/UsersController.js');

const routes = new Router();

routes.post('/denuncias', body(['title', 'content']).escape(), DenunciasController.store);

routes.post('/session', body(['login', 'password']).escape(), SessionController.store)

routes.use(jwtAuth);

routes.get('/', (req, res) => {
    return res.status(200).json({
        message: true,
        code: 200,
    });
});

// Denuncias routes
routes.get('/denuncias/:id', param(['id']).escape(), DenunciasController.show);
routes.get('/denuncias', DenunciasController.index);

// Users routes
routes.get('/users', UsersController.index);
routes.post('/users', body(['name', 'surname', 'login', 'password', 'confirm_password']).escape(), UsersController.store);

routes.use(catchError);

module.exports = routes;
