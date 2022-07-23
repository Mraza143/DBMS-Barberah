//const productController = require('../controllers/productController.js')
//const reviewController = require('../controllers/reviewController')
const salonController = require('../controllers/salonController')
    // const imageUploader = require('../utils/imageUploader')

// router
const router = require('express').Router()


// use routers
router.get('/singleSalon/:id', salonController.getSingleSalon)
router.get('/allSalons', salonController.getAllSalons)
router.post('/salonowner/newsalon', salonController.createSalon)
router.get('/getBarbers/:id', salonController.getSalonBarbers)

//router.get('/allProducts', productController.getAllProducts)

//router.get('/published', productController.getPublishedProduct)


module.exports = router