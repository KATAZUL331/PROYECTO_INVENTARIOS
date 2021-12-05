const mongoose = require('mongoose')
const { Schema } = mongoose

const UsuarioSchema = new Schema({
    nombres: { type: String, required: [true, 'Nombre obligatorio'] },
    apellidos: String,
    cedulaUsuario: Number,
    correoElectronico: String,
    telefono: Number,
    cargo: String,
    tipoContrato: String,
    jefeInmediato: String,
    date: { type: Date, default: Date.now }
})

//CONVERTIR A MODELO

module.exports = mongoose.model('usuarios', UsuarioSchema)