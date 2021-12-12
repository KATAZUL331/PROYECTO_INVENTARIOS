const { Router } = require('express')
const router = Router()
const UsuarioCtrl = require('../controller/Usuario.controller')
const Autorizacion = require('../helper/Autorizacion')

router.post('/crear', Autorizacion.verificarToken, UsuarioCtrl.crear)
router.get('/listarUsuario/:id', Autorizacion.verificarToken, UsuarioCtrl.listarUsuario)
router.get('/listarId/:id', Autorizacion.verificarToken, UsuarioCtrl.listarId)
router.get('/listarPorAdministrador/:id', Autorizacion.verificarToken, UsuarioCtrl.listarPorAdministrador)
router.get('/busquedaPorNombre/:criterio', Autorizacion.verificarToken, UsuarioCtrl.buscarUsuarioCriterio)
router.delete('/eliminarUsuario/:id', Autorizacion.verificarToken, UsuarioCtrl.eliminarUsuario)
router.put('/actualizarDatoUsuario/:id', Autorizacion.verificarToken, UsuarioCtrl.actualizarDatoUsuario)

//EXPORTAR
module.exports = router