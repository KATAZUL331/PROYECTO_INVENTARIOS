const { Router } = require('express')
const router = Router()
const UsuarioCtrl = require('../controller/Usuario.controller')

router.post('/crear', UsuarioCtrl.crear)
router.get('/listarUsuario', UsuarioCtrl.listarUsuario)
router.get('/listarId', UsuarioCtrl.listarId)
router.get('/listarPorAdministrador', UsuarioCtrl.listarPorAdministrador)
router.get('/busquedaPorNombre/:criterio', UsuarioCtrl.buscarUsuarioCriterio)
router.delete('/eliminarUsuario/:id', UsuarioCtrl.eliminarUsuario)
router.put('/actualizarDatoUsuario/:id', UsuarioCtrl.actualizarDatoUsuario)

//EXPORTAR
module.exports = router