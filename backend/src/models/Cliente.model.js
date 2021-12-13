const mongoose = require('mongoose')
const { Schema } = mongoose

const ClienteSchema = new Schema({
    nombres: String,
    apellidos: String,
    cedulaCliente: Number,
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

module.exports = mongoose.model('Cliente', ClienteSchema)