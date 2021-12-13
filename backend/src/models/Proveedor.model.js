const mongoose = require('mongoose')
const { Schema } = mongoose

const ProveedorSchema = new Schema({
    nombres: String,
    apellidos: String,
    cedulaProveedor: Number,
    tipoPersona: String,
    genero: String,
    correo: String,
    telefono: Number,
    cargo: String,
    empresa: String,
    direccion: String,
    fechaNacimiento: Date,
    adminNombre: String,
    date: { type: Date, default: Date.now }
})

//CONVERTIR A MODELO

module.exports = mongoose.model('proveedor', ProveedorSchema)