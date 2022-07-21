const router = require('express').Router()
const userController = require("../controllers/userController")
const imageUploader = require("../utils/imageUploader")




router.post('/register', imageUploader, userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logoutUser)
router.get('/getAppointments/:id', userController.getUserAppointments)











module.exports = router