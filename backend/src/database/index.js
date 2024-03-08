const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database.cjs');
const Denuncias = require('../app/models/Denuncias.js');
const Users = require('../app/models/Users.js');

const models = [Denuncias, Users];

class Database {
    constructor() {
        this.connection = new Sequelize(dbConfig);

        this.init();
    }

    init() {
        models.map((model) => model.init(this.connection)).map((model) => model.assoaciate && model.associate(this.connection.models));
    }
}

module.exports = new Database();
