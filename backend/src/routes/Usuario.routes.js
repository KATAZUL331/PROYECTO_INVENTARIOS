const { Router } = require('express')
const router = Router()
const UsuarioCtrl = require('../controller/Usuario.controller')

router.post('/crear', Autorizacion.verificarToken, UsuarioCtrl.crear)
router.get('/listarUsuario', Autorizacion.verificarToken, UsuarioCtrl.listarUsuario)
router.get('/listarId', Autorizacion.verificarToken, UsuarioCtrl.listarId)
router.get('/listarPorAdministrador', Autorizacion.verificarToken, UsuarioCtrl.listarPorAdministrador)
router.get('/busquedaPorNombre/:criterio', Autorizacion.verificarToken, UsuarioCtrl.buscarUsuarioCriterio)
router.delete('/eliminarUsuario/:id', Autorizacion.verificarToken, UsuarioCtrl.eliminarUsuario)
router.put('/actualizarDatoUsuario/:id', Autorizacion.verificarToken, UsuarioCtrl.actualizarDatoUsuario)

//EXPORTAR
module.exports = router