const { Router } = require('express')
const router = Router()
const AdminCtrl = require('../controller/Admin.controller')

router.post('/crear', AdminCtrl.crear)
router.post('/login', AdminCtrl.login)

//EXPORTAR
module.exports = router