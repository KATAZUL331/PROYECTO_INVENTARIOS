const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductoSchema = new Schema({
    nombre: { type: String, require: true },
    imagen: String,
    precio: String,
    descripcion: String,
    stock: Number,
    date: { type: Date, default: Date.now }
})

//CONVERTIR A MODELO
module.exports = mongoose.model('producto', ProductoSchema)