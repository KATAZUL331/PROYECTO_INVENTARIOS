const adminCtrl = {}
const Admin = require('../models/Admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    //PETICION
adminCtrl.crear = async(req, res) => {
    const { nombre, correo, contrasena } = req.body
    const NuevoAdmin = new Admin({
            nombre,
            correo,
            contrasena
        })
        //PARA EVITAR CORREOS DUPLICADOS
    const correoAdmin = await Admin.findOne({
        correo: correo
    })
    if (correoAdmin) {
        res.json({
            mensaje: 'EL CORREO YA FUE REGISTRADO CON ANTERIORIDAD, FAVOR VERIFICAR'
        })
    } else {
        NuevoAdmin.contrasena = await bcrypt.hash(contrasena, 10)
        const token = jwt.sign({ _id: NuevoAdmin._id }, 'Secreta')
        await NuevoAdmin.save()
        res.json({
            mensaje: 'BIENVENIDO',
            id: NuevoAdmin._id,
            nombre: NuevoAdmin.nombre,
            token
        })
    }
}

adminCtrl.login = async(req, res) => {
        const { correo, contrasena } = req.body
        const admin = await Admin.findOne({ correo: correo })
        if (!admin) {
            return res.json({
                mensaje: 'CORREO INCORRECTO, POR FAVOR VERIFIQUE'
            })
        }
        const match = await bcrypt.compare(contrasena, admin.contrasena)

        if (match) {
            const token = jwt.sign({ _id: admin._id }, 'Secreta')
            res.json({
                mensaje: 'BIENVENID@, HAS INICIADO SESION',
                id: admin._id,
                nombre: admin.nombre,
                token
            })
        } else {
            res.json({
                mensaje: 'CONTRASENA INCORRECTA, POR FAVOR VERIFIQUE'
            })
        }
    }
    //EXPORTAR EL MODULO
module.exports = adminCtrl