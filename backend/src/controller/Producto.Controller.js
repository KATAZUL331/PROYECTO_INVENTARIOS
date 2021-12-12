const ProductoCtrl = {}
const Producto = require('../models/Producto.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

ProductoCtrl.crearProducto = async(req, res) => {
    const {
        nombre,
        imagen,
        precio,
        descripcion,
        stock
    } = req.body;
    const NuevoProducto = new Producto({
        nombre,
        imagen,
        precio,
        descripcion,
        stock
    });
    const respuesta = await NuevoProducto.save();
    res.json({
        mensaje: 'PRODUCTO REGISTRADO SATISFACTORIAMENTE',
        respuesta
    })
}

ProductoCtrl.listadoProducto = async(req, res) => {
    const respuesta = await Producto.find()
    res.json(respuesta)
}

ProductoCtrl.listadoProductoId = async(req, res) => {
    const respuesta = await Producto.findById(req.params.id)
    res.json(respuesta)
}

ProductoCtrl.productoPrecio = async(req, res) => {
    const respuesta = await Producto.findByprecio(req.params.precio)
    res.json(respuesta)
}

ProductoCtrl.eliminarProducto = async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id)
    res.json('PRODUCTO ELIMINADO SATISFACTORIAMENTE')
}

ProductoCtrl.actualizarProducto = async(req, res) => {
    const { nombre, imagen, descripcion, precio, stock } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, { nombre, imagen, descripcion, precio, stock }

    )
    res.json('PRODUCTO ACTUALIZADO SATISFACTORIAMENTE');
}

module.exports = ProductoCtrl;