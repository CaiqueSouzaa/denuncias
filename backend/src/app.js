const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

require('./database/index.js');
const routes = require('./routes.js');

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(helmet());
        this.server.use(morgan('tiny'));
        this.server.use(cors('*'));
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;
