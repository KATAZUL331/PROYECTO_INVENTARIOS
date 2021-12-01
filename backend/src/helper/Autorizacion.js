const Autorizacion = {}
const jwt = require('jsonwebtoken')

Autorizacion.verificarToken = (req, res, next) => {
    if (!req.headers.autorizar) {
        return res.json({
            mensaje: 'NO ESTAS AUTORIZAD@'
        })
    }

    const token = req.headers.autorizar
    if (token === null) {
        return res.json({
            mensaje: 'NO ESTAS AUTORIZAD@'
        })
    }

    jwt.verify(token, 'Secreta', (error, resultado) => {
        if (error)
            return res.json({
                mensaje: 'NO ESTAS AUTORIZAD@'
            })
        next();
    })
}

module.exports = Autorizacion