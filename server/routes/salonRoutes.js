
const salonController = require('../controllers/salonController')


// router
const router = require('express').Router()


// use routers
router.get('/singleSalon/:id', salonController.getSingleSalon)
router.get('/allSalons', salonController.getAllSalons)
router.get('/getBarbers/:id', salonController.getSalonBarbers)

router.get('/salonowner/salons', salonController.getAdminSalons)
router.post('/salonowner/newsalon', salonController.createSalon)



module.exports = router
