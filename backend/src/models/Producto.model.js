const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductoSchema = new Schema({
    titulo: { type: String, require: true },
    imagen: String,
    precio: String,
    descripcion: String,
    stock: Number

});
//CONVERTIR A MODELO
module.exports = mongoose.model('Producto', ProductoSchema);