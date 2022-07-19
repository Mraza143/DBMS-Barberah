//const productController = require('../controllers/productController.js')
//const reviewController = require('../controllers/reviewController')
const salonController = require('../controllers/salonController')


// router
const router = require('express').Router()


// use routers
router.post('/addSalon', salonController.addSalon)

//router.get('/allProducts', productController.getAllProducts)

//router.get('/published', productController.getPublishedProduct)


module.exports = router