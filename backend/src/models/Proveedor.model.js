const mongoose = require('mongoose')
const { Schema } = mongoose

const ProveedorSchema = new Schema({
    nitEmpresa: Number,
    nombreEmpresa: String,
    direccionEmpresa: String,
    tipoPersona: String,
    cedulaRepresentante: Number,
    nombreRepresentante: String,
    telefonoRepresentante: Number,
    correoRepresentante: String,
    cedulaContacto: Number,
    nombreContacto: String,
    telefonoContacto: Number,
    correoContacto: String,
    adminNombre: String,
    date: { type: Date, default: Date.now }
})

//CONVERTIR A MODELO

module.exports = mongoose.model('proveedor', ProveedorSchema)