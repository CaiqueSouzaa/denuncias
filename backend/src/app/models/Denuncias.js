const { Sequelize, Model } = require('sequelize');

class Denuncias extends Model {
    static init(sequelize) {
        super.init({
            title: Sequelize.STRING,
            content: Sequelize.STRING,
        }, {
            sequelize,
            modelName: 'Denuncias',
            tableName: 'denuncias',
        });

        return this;
    }
}

module.exports = Denuncias;
