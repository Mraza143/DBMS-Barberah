//const productController = require('../controllers/productController.js')
//const reviewController = require('../controllers/reviewController')
//const salonController = require('../controllers/salonController')
const barberContoller = require('../controllers/barberController')


// router
const router = require('express').Router()


// use routers
//router.post('/addSalon', salonController.addSalon)
router.post('/addBarber', barberContoller.addBarber)
router.get('/', barberContoller.getAllBarbers)
router.get('/details/:id', barberContoller.getSingleBarber)
router.get('/getAllReviews/:id' , barberContoller.getBarberReviews)
router.put('/ratings/:id', barberContoller.updateRatingsOfBarber)
router.get('/:name', barberContoller.getBarbersByLocation)
router.put('/salonowner/:id', barberContoller.updateBarber)
router.delete('/salonowner/:id', barberContoller.deleteBarber)


module.exports = router