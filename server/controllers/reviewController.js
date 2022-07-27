const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');



const Barbers = db.barbers;
const Reviews = db.reviews;

// main work

// 1. create Barber

const addReview = async(req, res) => {
    let barberId = req.body.barber_id;

    const reviews= await Reviews.findAll({where: { barberId: barberId }})
    //const barber = await Barbers.findById(req.params.id)
    let val = 0;
    console.log(barberId);
    console.log("reviws length"+reviews.length)
    console.log("hello")

    if(reviews.length!=0){
        reviews.forEach((rev) => {
            val += rev.rating
        })
        //product.ratings = avg / product.reviews.length
        val = val / reviews.length
    
  }else{
    /*val =
    reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length*/
    val= req.body.rating;
   
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

const getAverageReviewsofASpecificSalon = catchAsyncErrors(async(req, res, next) => {
        let salonName = req.params.name;
        const barbers= await Barbers.findAll({where: { worksAt: salonName }})

    if (barbers.length==0) {
  res.status(200).json({
    success: true,
    salonAverage : ""
    })
    }

    if(barbers.length!=0){
        let salonAverage = 0;
        //barbers.forEach((barber) => {
            for (const barber of barbers) {
            console.log("barber id " + barber.id);
            const reviews= await Reviews.findAll({where: { barberId: barber.id}})
            const lastItem = reviews[reviews.length-1];
            const {average} = lastItem;
            salonAverage = salonAverage + average;
            }
       // })
        salonAverage = salonAverage /barbers.length;

    res.status(200).json({
     success: true,
        salonAverage
        })}

})



module.exports = {
    addReview,
    getAllReviews, 
    getAverageReviewsofASpecificBarber,
    getAverageReviewsofASpecificSalon

}