const { Router } = require('express')
const router = Router()
const ProductoCtrl = require('../controller/Producto.controller')
const Autorizacion = require('../helper/Autorizacion')


router.post('/crearProducto', Autorizacion.verificarToken, ProductoCtrl.crearProducto)
router.get('/listarProducto', Autorizacion.verificarToken, ProductoCtrl.listadoProducto)
router.get('/listarProductoId/:id', Autorizacion.verificarToken, ProductoCtrl.listadoProductoId)
router.get('/productoPrecio', Autorizacion.verificarToken, ProductoCtrl.productoPrecio)
router.delete('/eliminarProducto/:id', Autorizacion.verificarToken, ProductoCtrl.eliminarProducto)
router.put('/actualizarProductoId/:id', Autorizacion.verificarToken, ProductoCtrl.actualizarProducto)

//EXPORTAR
module.exports = router