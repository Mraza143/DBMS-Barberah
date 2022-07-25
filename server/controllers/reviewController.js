const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


// create main Model
//const Product = db.products
//const Salons = db.salons
//const Review = db.reviews
const Barbers = db.barbers;
const Reviews = db.reviews;

// main work

// 1. create Barber

const addReview = async(req, res) => {


    let barberId = req.params.id;

    const reviews= await Reviews.findAll({where: { barberId: barberId }})
    //const barber = await Barbers.findById(req.params.id)
    let val = 0;
    console.log("reviws length"+reviews.length)
    if(reviews.length===0){
    val= req.body.rating;
  }else{
    /*val =
    reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length*/
    reviews.forEach((rev) => {
        val += rev.rating
    })
    //product.ratings = avg / product.reviews.length
    val = val / reviews.length
   
    }

    let info = {
        barberName: req.body.barberName,
        customerName: req.body.customerName,
        rating: req.body.rating,
        comment:req.body.comment,
        average: val,
        barberId:req.body.barber_id
    }

    const review = await Reviews.create(info)
    res.status(200).send(review)
    console.log(review)

    /*
     INSERT INTO `reviews` (`id`,`barberName`,`customerName`,`rating`,`comment`,`average`,`createdAt`,`updatedAt`,`barberId`) VALUES (DEFAULT,?,?,?,?,?,?,?,?);

    */

}

// Get All Barbers 
const getAllReviews = catchAsyncErrors(async(req, res, next) => {

    let barberId =  req.params.id
    const reviews = await Reviews.findAll({ where: { barberId: barberId } })  
   // const reviews = await Reviews.findAll({barberId: req.params.id });
    res.status(200).json({
        success: true,
        reviews
    })

    /*SELECT `id`, `barberName`, `customerName`, `rating`, `comment`, `average`, `createdAt`, `updatedAt`, `barberId` FROM `reviews` AS `reviews` WHERE `reviews`.`barberId` = '1'; */

})

const getAverageReviewsofASpecificBarber = catchAsyncErrors(async(req, res, next) => {
                let barberId = req.params.id;
                const reviews= await Reviews.findAll({where: { barberId: barberId }})
        
        if (reviews.length==0) {
          res.status(200).json({
            success: true,
            average : ""
        })
        }
        if(reviews){
        const lastItem = reviews[reviews.length-1];
        const {average} = lastItem;
        
        res.status(200).json({
          success: true,
          average
      })}
      
      })


module.exports = {
    addReview,
    getAllReviews, 
    getAverageReviewsofASpecificBarber

}