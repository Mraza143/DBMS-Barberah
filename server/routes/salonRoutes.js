//const productController = require('../controllers/productController.js')
//const reviewController = require('../controllers/reviewController')
const salonController = require('../controllers/salonController')
    // const imageUploader = require('../utils/imageUploader')

// router
const router = require('express').Router()


// use routers
router.get('/singleSalon/:id', salonController.getSingleSalon)
router.get('/allSalons', salonController.getAllSalons)
router.get('/getBarbers/:id', salonController.getSalonBarbers)

router.get('/salonowner/salons', salonController.getAdminSalons)
router.post('/salonowner/newsalon', salonController.createSalon)



module.exports = router
































// router.get('/salonowner/salon/:id', salonController.getAdminSalonDetails)
// router.put('/salonowner/salon/:id', salonController.updateSalon)