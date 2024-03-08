const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../../config/jwtConfig.js');

module.exports = async (req, res, next) => {
    const headersAuth = req.headers.authorization;

    if (!headersAuth) {
        return res.status(401).json({
            message: 'Token não pressente',
            code:800
        });
    }

    const [, token] = headersAuth.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({
            message: 'Token inválido',
            code: 801,
        });
    }
}