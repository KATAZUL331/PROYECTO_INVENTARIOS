const ProveedorCtrl = {}
const Proveedor = require('../models/Proveedor.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    //PETICION
ProveedorCtrl.crear = async(req, res) => {
    const {
        nombres,
        apellidos,
        cedulaProveedor,
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
    const NuevoProveedor = new Proveedor({
        nombres,
        apellidos,
        cedulaProveedor,
        tipoPersona,
        genero,
        correo,
        telefono,
        cargo,
        empresa,
        direccion,
        fechaNacimiento,
    })
    const respuesta = await NuevoProveedor.save()
    res.json({
        mensaje: 'PROVEEDOR CREADO SATISFACTORIAMENTE',
        respuesta
    })
}

//lISTADO DE Proveedor

ProveedorCtrl.listarProveedor = async(req, res) => {
    const respuesta = await Proveedor.find()
    res.json(respuesta)
}

ProveedorCtrl.listarId = async(req, res) => {
    const id = req.params.id
    const respuesta = await Proveedor.findById({ _id: id })
    res.json(respuesta)
}

ProveedorCtrl.listarPorAdministrador = async(req, res) => {
    const id = req.params.id
    const respuesta = await Proveedor.find({ admin: id })
    res.json(respuesta)
}

ProveedorCtrl.eliminarProveedor = async(req, res) => {
    const id = req.params.id
    await Proveedor.findByIdAndRemove({ _id: id })
    res.json({
        mensaje: 'PROVEEDOR ELIMINADO SATISFACTORIAMENTE'
    })
}

ProveedorCtrl.actualizarDatoProveedor = async(req, res) => {
    const id = req.params.id
    await Proveedor.findByIdAndUpdate({ _id: id }, req.body)
    res.json({
        mensaje: 'PROVEEDOR ACTUALIZADO SATISFACTORIAMENTE'
    })
}

ProveedorCtrl.buscarProveedorCriterio = async(req, res) => {
    const nombres = req.params.criterio;
    try {
        const respuesta = await Proveedor.find({ nombres: nombres })
        res.json(respuesta)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'NO ENCONTRADO',
            error
        })
    }
}

//EXPORTAR EL MODULO

module.exports = ProveedorCtrl