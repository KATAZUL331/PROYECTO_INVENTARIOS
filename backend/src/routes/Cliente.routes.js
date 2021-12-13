const { Router } = require('express')
const router = Router()
const ClienteCtrl = require('../controller/Cliente.controller')
const Autorizacion = require('../helper/Autorizacion')

router.post('/crear', Autorizacion.verificarToken, ClienteCtrl.crear)
router.get('/listarCliente/:id', Autorizacion.verificarToken, ClienteCtrl.listarCliente)
router.get('/listarId/:id', Autorizacion.verificarToken, ClienteCtrl.listarId)
router.get('/listarPorAdministrador/:id', Autorizacion.verificarToken, ClienteCtrl.listarPorAdministrador)
router.get('/busquedaPorNombre/:criterio', Autorizacion.verificarToken, ClienteCtrl.buscarClienteCriterio)
router.delete('/eliminarCliente/:id', Autorizacion.verificarToken, ClienteCtrl.eliminarCliente)
router.put('/actualizarDatoCliente/:id', Autorizacion.verificarToken, ClienteCtrl.actualizarDatoCliente)

//EXPORTAR
module.exports = router