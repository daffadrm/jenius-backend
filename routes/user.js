const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const authenticate =  require('../middleware/authenticate')

router.get ('/', authenticate, userController.readUser)
router.get ('/show/', userController.show)
router.get ('/account/:account', userController.findAccount)
router.get ('/identity/:identity', userController.findIdentity)
router.post ('/addUser', userController.addUser)
router.put ('/update', userController.updateUser)
router.delete ('/delete', userController.deleteUser)

router.post('/login', authController.login)

module.exports = router
