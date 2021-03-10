const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const authenticate =  require('../middleware/authenticate')

router.get ('/', authenticate, userController.readUser)
router.get ('/show/', authenticate,userController.show)
router.get ('/account/:account', authenticate,userController.findAccount)
router.get ('/identity/:identity', authenticate,userController.findIdentity)
router.post ('/addUser', authenticate,userController.addUser)
router.put ('/update', authenticate,userController.updateUser)
router.delete ('/delete', authenticate,userController.deleteUser)

router.post('/login', authController.login)

module.exports = router
