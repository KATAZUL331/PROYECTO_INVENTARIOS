const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    titulo: { type: String, require: true },
    imagen: String,
    precio: String,
    descripcion: String,
    stock: Number

});

module.exports = model('Producto', articuloSchema);