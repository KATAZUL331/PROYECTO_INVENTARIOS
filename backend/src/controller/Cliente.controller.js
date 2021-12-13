const ClienteCtrl = {}
const Cliente = require('../models/Cliente.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    //PETICION
ClienteCtrl.crear = async(req, res) => {
    const {
        nombres,
        apellidos,
        cedulaCliente,
        tipoPersona,
        genero,
        correo,
        telefono,
        cargo,
        empresa,
        direccion,
        fechaNacimiento,
        adminNombre
    } = req.body
    const NuevoCliente = new Cliente({
        nombres,
        apellidos,
        cedulaCliente,
        tipoPersona,
        genero,
        correo,
        telefono,
        cargo,
        empresa,
        direccion,
        fechaNacimiento,
    })
    const respuesta = await NuevoCliente.save()
    res.json({
        mensaje: 'CLIENTE CREADO SATISFACTORIAMENTE',
        respuesta
    })
}

//lISTADO DE CLIENTE

ClienteCtrl.listarCliente = async(req, res) => {
    const respuesta = await Cliente.find()
    res.json(respuesta)
}

ClienteCtrl.listarId = async(req, res) => {
    const id = req.params.id
    const respuesta = await Cliente.findById({ _id: id })
    res.json(respuesta)
}

ClienteCtrl.listarPorAdministrador = async(req, res) => {
    const id = req.params.id
    const respuesta = await Cliente.find({ admin: id })
    res.json(respuesta)
}

ClienteCtrl.eliminarCliente = async(req, res) => {
    const id = req.params.id
    await Cliente.findByIdAndRemove({ _id: id })
    res.json({
        mensaje: 'CLIENTE ELIMINADO SATISFACTORIAMENTE'
    })
}

ClienteCtrl.actualizarDatoCliente = async(req, res) => {
    const id = req.params.id
    await Cliente.findByIdAndUpdate({ _id: id }, req.body)
    res.json({
        mensaje: 'CLIENTE ACTUALIZADO SATISFACTORIAMENTE'
    })
}

ClienteCtrl.buscarClienteCriterio = async(req, res) => {
    const nombres = req.params.criterio;
    try {
        const respuesta = await Cliente.find({ nombres: nombres })
        res.json(respuesta)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'NO ENCONTRADO',
            error
        })
    }
}

//EXPORTAR EL MODULO

module.exports = ClienteCtrl