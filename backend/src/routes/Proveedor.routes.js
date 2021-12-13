const { Router } = require('express')
const router = Router()
const ProveedorCtrl = require('../controller/Proveedor.controller')
const Autorizacion = require('../helper/Autorizacion')

router.post('/crear', Autorizacion.verificarToken, ProveedorCtrl.crear)
router.get('/listarProveedor/:id', Autorizacion.verificarToken, ProveedorCtrl.listarProveedor)
router.get('/listarId/:id', Autorizacion.verificarToken, ProveedorCtrl.listarId)
router.get('/listarPorAdministrador/:id', Autorizacion.verificarToken, ProveedorCtrl.listarPorAdministrador)
router.get('/busquedaPorNombre/:criterio', Autorizacion.verificarToken, ProveedorCtrl.buscarProveedorCriterio)
router.delete('/eliminarProveedor/:id', Autorizacion.verificarToken, ProveedorCtrl.eliminarProveedor)
router.put('/actualizarDatoProveedor/:id', Autorizacion.verificarToken, ProveedorCtrl.actualizarDatoProveedor)

//EXPORTAR
module.exports = router