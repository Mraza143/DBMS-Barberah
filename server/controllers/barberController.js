const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary")


const Salons = db.salons
const Barbers = db.barbers;
const Reviews = db.reviews;

// main work

// 1. create Barber


const addBarber = catchAsyncErrors(async(req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'dbms_barberimages',
        width: 150,
        crop: 'scale',
    })
   

    let worksAt =req.params.worksAt;
    let salon = await Salons.findOne({ where: { name :  worksAt } })
    let info = {
        name: req.body.name,
        worksAt: req.body.worksAt,
        timings: req.body.timings,
        ratings: req.body.ratings,
        experience: req.body.experience,
        salonId: salon.id,
        image: myCloud.secure_url

    }

    const barber = await Barbers.create(info)
    res.status(200).json({
        success: true,
        barber
    })

})

// Get All Barbers 
const getAllBarbers = catchAsyncErrors(async(req, res, next) => {
    const barbers = await Barbers.findAll({})
    res.status(200).json({
        success: true,
        barbers
    })
})


// Get Single Barber By Id
const getSingleBarber = catchAsyncErrors(async(req, res, next) => {

    let id = req.params.id
    const barber = await Barbers.findOne({ where: { id: id } })
    res.status(200).json({
        success: true,
        barber
    })

})


// Update Ratings Of Barber
const updateRatingsOfBarber = catchAsyncErrors(async(req, res, next) => {

    let id = req.params.id
    //let updateValues= {average : req.body.average}
    const updatedBarberRatings = await Barbers.update(req.body, { where: { id: id } })
    //const barber = await Barbers.findOne({ where: { id: id }})

    res.status(200).json({
        success: true,
        message: "Barber Ratings Updated SuccessFully",
        updatedBarberRatings
    })


})

// Get Barbers By Location
const getBarbersByLocation = catchAsyncErrors(async(req, res, next) => {

    let worksAt = req.params.name
    const barbers = await Barbers.findAll({ where: { worksAt: worksAt } })
    res.status(200).json({
        success: true,
        barbers
    })

})

const getBarberReviews = async(req, res) => {
    const id = req.params.id
    const data = await Barbers.findOne({
        include: [{
            model: Reviews,
            as: 'reviews'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}



// Get Barbers By Url

// Images method will determine this function



// Get All Barbers (Admin)
const getAdminBarbers = catchAsyncErrors(async(req, res, next) => {
    const barbers = await Barbers.findAll({})
    res.status(200).json({
        success: true,
        barbers
    })
})



// Update Barber (Admin)
const updateBarber = catchAsyncErrors(async(req, res, next) => {

    // Images Code Will Be done later

    let id = req.params.id
    const barber = await Barbers.update(req.body, { where: { id: id } })

    if (!barber) return next(new ErrorHandler("Barber not Found with this Id", 400))

    res.status(200).json({
        success: true,
        message: "Barber Updated Successfully",
        barber
    })

})

// Delete Barber (Admin)
const deleteBarber = catchAsyncErrors(async(req, res, next) => {

    // Images Code Will Be done later

    let id = req.params.id
    const barber = await Barbers.destroy(req.body, { where: { id: id } })

    if (!barber) return next(new ErrorHandler("Barber not Found with this Id", 400))

    res.status(200).json({
        success: true,
        message: "Barber Deleted Successfully",
        barber
    })

})











module.exports = {
    addBarber,
    getAllBarbers,
    getSingleBarber,
    updateRatingsOfBarber,
    getBarbersByLocation,
    getAdminBarbers,
    updateBarber,
    deleteBarber,
    getBarberReviews



}