const ProductoCtrl = {}
const Producto = require('../models/Producto.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

ProductoCtrl.createProducto = async(req, res) => {
    const { titulo, imagen, precio, descripcion, stock } = req.body;
    const newProducto = new Producto({
        titulo,
        imagen,
        precio,
        descripcion,
        stock

    });
    await newProducto.save();
    res.json('Producto añadido') //
}

ProductoCtrl.getProducto = async(req, res) => {
    const Producto = await Producto.find();
    res.json(Producto);
}

ProductoCtrl.getProducto = async(req, res) => {
    const Producto = await Producto.findById(req.params.id)
    res.json(Producto)
}

ProductoCtrl.getProductop = async(req, res) => {
    const Producto = await Producto.findByprecio(req.params.precio)
    res.json(Producto)
}

ProductoCtrl.deleteProducto = async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id)
    res.json('Producto eliminado')
}

ProductoCtrl.updateProducto = async(req, res) => {
    const { titulo, imagen, descripcion, precio, stock } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, { titulo, imagen, descripcion, precio, stock }

    )
    res.json('Producto actualizado');
}

module.exports = ProductoCtrl;