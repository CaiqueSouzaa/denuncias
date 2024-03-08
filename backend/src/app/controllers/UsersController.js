const { matchedData } = require('express-validator');
const Yup = require('yup');

const Users = require('../models/Users.js');

class UsersController {
    async index(req, res, next) {
        try {
            const users = await Users.findAll({
                attributes: ['id', 'name', 'surname', 'login'],
            });

            return res.status(200).json({
                users,
                code: 605,
            });
        } catch (err) {
            return next(err);
        }
    }

    async store(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            surname: Yup.string(),
            login: Yup.string().min(5).required(),
            password: Yup.string().min(5).required(),
            confirm_password: Yup.string().min(5).required(),
        });

        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(200).json({
                message: err.errors,
                code: 601
            });
        }

        for (const key of Object.keys(data)) {
            if (data[key] === '') {
                data[key] = undefined;
            }
        }

        // Verificando se as senhas são iguais
        if (data.confirm_password !== data.password) {
            return res.status(200).json({
                message: 'As senha não são iguais',
                code: 602,
            });
        }

        // Verificando se o nome de login segue em uso
        try {
            const user = await Users.findOne({
                where: {
                    login: data.login,
                },
                attributes: ['login'],
            });

            if (user) {
                return res.status(200).json({
                    message: 'Nome de login não disponível',
                    code: 602,
                });
            }
        } catch (err) {
            return next(err);
        }
        // Tentando criar o novo usuário
        try {
            const { id } = await Users.create(data);

            return res.status(201).json({
                id,
                message: 'Usuário registrado com sucesso',
                code: 604,
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UsersController();
