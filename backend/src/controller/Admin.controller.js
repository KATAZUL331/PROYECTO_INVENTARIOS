const AdminCtrl = {}
const Admin = require('../models/Admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//PETICION
AdminCtrl.crear = async(req, res) => {
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
        const token = jwt.sign({ _id: NuevoAdmin._id }, 'Secreto')
        await NuevoAdmin.save()

        res.json({
            mensaje: 'USUARIO REGISTRADO',
            id: NuevoAdmin._id,
            nombre: NuevoAdmin.nombre,
            token
        })
    }
}

AdminCtrl.login = async(req, res) => {
    const { correo, contrasena } = req.body
    const admin = await Admin.findOne({ correo: correo })
    if (!admin) {
        return res.json({
            mensaje: 'CORREO INCORRECTO, POR FAVOR VERIFIQUE'
        })
    }
    const match = await bcrypt.compare(contrasena, admin.contrasena)

    if (match) {
        const token = jwt.sign({ _id: admin._id }, 'Secreto')
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

//lISTADO DE CLIENTE

AdminCtrl.listarAdmin = async(req, res) => {
    const respuesta = await Admin.find()
    res.json(respuesta)
}

AdminCtrl.listarId = async(req, res) => {
    const id = req.params.id
    const respuesta = await Admin.findById({ _id: id })
    res.json(respuesta)
}

AdminCtrl.listarPorAdministrador = async(req, res) => {
    const id = req.params.id
    const respuesta = await Admin.find({ admin: id })
    res.json(respuesta)
}

AdminCtrl.eliminarAdmin = async(req, res) => {
    const id = req.params.id
    await Admin.findByIdAndRemove({ _id: id })
    res.json({
        mensaje: 'ADMINISTRADOR ELIMINADO SATISFACTORIAMENTE'
    })
}

AdminCtrl.actualizarDatoAdmin = async(req, res) => {
    const id = req.params.id
    await Admin.findByIdAndUpdate({ _id: id }, req.body)
    res.json({
        mensaje: 'ADMINISTRADOR ACTUALIZADO SATISFACTORIAMENTE'
    })
}

AdminCtrl.buscarAdminCriterio = async(req, res) => {
    const nombre = req.params.criterio;
    try {
        const respuesta = await Admin.find({ nombre: nombre })
        res.json(respuesta)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'NO ENCONTRADO',
            error
        })
    }
}

//EXPORTAR EL MODULO
module.exports = AdminCtrl