
const userController = require("../controllers/userController")

const router = require('express').Router()


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logoutUser)
router.get('/getAppointments/:id', userController.getUserAppointments)











module.exports = router