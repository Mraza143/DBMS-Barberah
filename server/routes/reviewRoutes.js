//const productController = require('../controllers/productController.js')
//const reviewController = require('../controllers/reviewController')
//const salonController = require('../controllers/salonController')
const reviewController = require('../controllers/reviewController')

// router
const router = require('express').Router()


// use routers
router.post('/addReview', reviewController.addReview)
//router.post('/addSalon', salonController.addSalon)
//router.get('/getBarbers/:id', salonController.getSalonBarbers)

//router.get('/allProducts', productController.getAllProducts)

//router.get('/published', productController.getPublishedProduct)


module.exports = router