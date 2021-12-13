const { Router } = require('express')
const router = Router()
const AdminCtrl = require('../controller/Admin.controller')
const Autorizacion = require('../helper/Autorizacion')


router.post('/crear', AdminCtrl.crear)
router.post('/login', AdminCtrl.login)

router.get('/listarAdmin/:id', Autorizacion.verificarToken, AdminCtrl.listarAdmin)
router.get('/listarId/:id', Autorizacion.verificarToken, AdminCtrl.listarId)
router.get('/listarPorAdministrador/:id', Autorizacion.verificarToken, AdminCtrl.listarPorAdministrador)
router.get('/busquedaPorNombre/:criterio', Autorizacion.verificarToken, AdminCtrl.buscarAdminCriterio)
router.delete('/eliminarAdmin/:id', Autorizacion.verificarToken, AdminCtrl.eliminarAdmin)
router.put('/actualizarDatoAdmin/:id', Autorizacion.verificarToken, AdminCtrl.actualizarDatoAdmin)

//EXPORTAR
module.exports = router