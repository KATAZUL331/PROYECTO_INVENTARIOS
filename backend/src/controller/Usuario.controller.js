const UsuarioCtrl = {}
const Usuario = require('../models/Usuario.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    //PETICION
UsuarioCtrl.crear = async(req, res) => {
        const {
            nombres,
            apellidos,
            cedulaUsuario,
            correoElectronico,
            telefono,
            cargo,
            tipoContrato,
            jefeInmediato
        } = req.body
        const NuevoUsuario = new Usuario({
            nombres,
            apellidos,
            cedulaUsuario,
            correoElectronico,
            telefono,
            cargo,
            tipoContrato,
            jefeInmediato
        })
        const respuesta = await NuevoUsuario.save()
        res.json({
            mensaje: 'USUARIO CREADO SATISFACTORIAMENTE',
            respuesta
        })
    }
    //lISTADO DE USUARIO

UsuarioCtrl.listarUsuario = async(req, res) => {
    const respuesta = await Usuario.find()
    res.json(respuesta)
}

UsuarioCtrl.listarId = async(req, res) => {
    const id = req.params.id;
    const respuesta = await Usuario.findById({ _id: id })
    res.json(respuesta)
}

UsuarioCtrl.listarPorAdministrador = async(req, res) => {
    const id = req.params.id;
    const respuesta = await Usuario.find({ admin: id })
    res.json(respuesta)
}

UsuarioCtrl.eliminarUsuario = async(req, res) => {
    const id = req.params.id;
    await Usuario.findByIdAndRemove({ _id: id })
    res.json({
        mensaje: 'USUARIO ELIMINADO SATISFACTORIAMENTE'
    })
}

UsuarioCtrl.actualizarDatoUsuario = async(req, res) => {
    const id = req.params.id;
    await Usuario.findByIdAndUpdate({ _id: id }, req.body)
    res.json({
        mensaje: 'USUARIO ACTUALIZADO SATISFACTORIAMENTE'
    })
}

UsuarioCtrl.buscarUsuarioCriterio = async(req, res) => {
    const nombres = req.params.criterio;
    try {
        const respuesta = await Usuario.find({ nombres: nombres })
        res.json(respuesta)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'NO ENCONTRADO',
            error
        })
    }
}

//EXPORTAR EL MODULO

module.exports = UsuarioCtrl