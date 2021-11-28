const mongoose = require('mongoose')
const { Schema } = mongoose

const AdminSchema = new Schema({
    nombre: String,
    correo: String,
    contrasena: String,
    date: { type: Date, default: Date.now }
})

//CONVERTIR A MODELO
module.exports = mongoose.model('admin', AdminSchema)