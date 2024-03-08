const { matchedData } = require('express-validator');
const jwt = require('jsonwebtoken');
const Yup = require('yup');

const jwtConfig = require('../../config/jwtConfig.js');
const Users = require('../models/Users.js');

class SessionController {
    async store(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            login: Yup.string().min(5).required(),
            password: Yup.string().min(5).required(),
        });

        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(200).json({
                message: err.errors,
                code: 700,
            });
        }

        let user;

        // Verificando se o login informado existe
        try {
            user = await Users.findOne({
                where: {
                    login: data.login,
                },
                attributes: ['login', 'password_hash'],
            });

            if (!user) {
                return res.status(200).json({
                    message: 'Usuário ou senha inválidos',
                    code: 701,
                });
            }
        } catch (err) {
            return next(err);
        }

        // Verificando se a senha informada é do usuário
        if (!(await user.checkPassword(data.password))) {
            return res.status(200).json({
                message: 'Usuário ou senha inválidos',
                code: 701,
            });
        }

        // Retornando o token de sessão
        return res.status(201).json({
            session_token: jwt.sign({id: user.dataValues.id}, jwtConfig.secret, {
                expiresIn: jwtConfig.expiresIn,
            }),
            message: 'Logado com sucesso',
            code: 702,
        });
    }
}

module.exports = new SessionController();
