
const reviewController = require('../controllers/reviewController')

const router = require('express').Router()


// use routers
router.post('/addReview/:id', reviewController.addReview)
router.get('/:id' ,reviewController.getAllReviews);

router.get('/average/:id', reviewController.getAverageReviewsofASpecificBarber)


module.exports = router