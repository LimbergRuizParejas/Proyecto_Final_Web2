
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const { verificarToken, esAdmin } = require('../middlewares/auth.middleware')


router.get('/', verificarToken, esAdmin, UserController.getAllUsers)

router.get('/me', verificarToken, UserController.getProfile)

router.patch('/:id/password', verificarToken, UserController.updatePassword)

router.patch('/:id/rol', verificarToken, esAdmin, UserController.toggleAdmin)

router.delete('/:id', verificarToken, esAdmin, UserController.removeUser)

module.exports = router
