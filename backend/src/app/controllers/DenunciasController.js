const { Sequelize } = require('sequelize');
const { matchedData } = require('express-validator');
const Yup = require('yup');

const Denuncias = require('../models/Denuncias.js');

class DenunciasController {
    async show(req, res, next) {
        const data = matchedData(req);

        try {
            const denuncia = await Denuncias.findByPk(data.id, {
                attributes: ['id', 'title', 'content',
                    [Sequelize.literal("DATE_FORMAT(DATE_SUB(created_at, INTERVAL 3 HOUR), '%d/%m/%Y')"), 'date'],
                    [Sequelize.literal("DATE_FORMAT(DATE_SUB(created_at, INTERVAL 3 HOUR), '%H:%i:%s')"), 'hour']
            ],
            });

            return res.status(200).json({
                denuncia,
                code: 904,
            });

        } catch (err) {
            return next(err);
        }
    }

    async index(req, res, next) {
        try {
            const denuncias = await Denuncias.findAll({
                attributes: ['id', 'title', 'content',
                [Sequelize.literal("DATE_FORMAT(DATE_SUB(created_at, INTERVAL 3 HOUR), '%d/%m/%Y')"), 'date'],
                [Sequelize.literal("DATE_FORMAT(DATE_SUB(created_at, INTERVAL 3 HOUR), '%H:%i:%s')"), 'hour'],
            ],
            });

            const amount = await Denuncias.count();

            return res.status(200).json({
                denuncias,
                amount,
                code: 903,
            });
        } catch (err) {
            return next(err);
        }
    }

    async store(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            title: Yup.string(),
            content: Yup.string(),
        });

        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(400).json({
                message: err.errors,
                code: 900,
            });
        }

        // Validando se há ao menos um campo preenchido
        if (!data.title && !data.content) {
            return res.status(400).json({
                message: 'Ao menos um dos campos necessita ser preenchido',
                fields: ['title', 'content'],
                code: 901
            })
        }

        // Tentando salvar o item
        try {
            const { id } = await Denuncias.create(data);

            return res.status(201).json({
                id,
                message: 'Item registrador com sucesso',
                code: 902
            })
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new DenunciasController();
