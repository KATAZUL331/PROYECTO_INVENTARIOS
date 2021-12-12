const mongoose = require('mongoose')
const { Schema } = mongoose

const UsuarioSchema = new Schema({
    nombres: String,
    apellidos: String,
    cedulaUsuario: Number,
    correo: String,
    telefono: Number,
    cargo: String,
    tipoContrato: String,
    jefeInmediato: String,
    adminNombre: String,
    date: { type: Date, default: Date.now }
})

//CONVERTIR A MODELO

module.exports = mongoose.model('usuario', UsuarioSchema)