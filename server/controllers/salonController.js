const db = require('../models')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const cloudinary = require("cloudinary")

// image Upload
const multer = require('multer')
const path = require('path')
const ErrorHandler = require('../utils/errorHandler')


// create main Model
const Product = db.products
const Salons = db.salons
const Barbers = db.barbers;
const Review = db.reviews

// ==============
// main work
// ==============




// Get All Salons (Admin)
const getAdminSalons = catchAsyncErrors(async(req, res, next) => {

    let salons = await Salons.findAll({})
    res.status(200).json({
        success: true,
        salons
    })

})








// 1. create Salon (Admin)
const createSalon = catchAsyncErrors(async(req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'dbms_salonimages',
        width: 150,
        crop: 'scale',
    })


    let info = {
        name: req.body.name,
        timings: req.body.timings,
        location: req.body.location,
        image: myCloud.secure_url,

    }

    const salon = await Salons.create(info)
    res.status(200).json({
            success: true,
            salon
        })
        // console.log(salon)


})








// ==========================

// Get Single Salon by id in specific salon
const getSingleSalon = catchAsyncErrors(async(req, res, next) => {

    let id = req.params.id
    let salon = await Salons.findOne({ where: { id: id } })
    res.status(200).json({
        success: true,
        salon
    })

})


// Home Page All Salons
const getAllSalons = catchAsyncErrors(async(req, res, next) => {

    let salons = await Salons.findAll({})
    res.status(200).json({
        success: true,
        salons
    })

})




// Rough Relations
const getSalonBarbers = async(req, res) => {
    const id = req.params.id
    const data = await Salons.findOne({
        include: [{
            model: Barbers,
            as: 'barbers'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}



module.exports = {
    getAdminSalons,
    createSalon,
    getSalonBarbers,
    getSingleSalon,
    getAllSalons,


}











































// // Get All Salons (Admin)
// const getAdminSalonDetails = catchAsyncErrors(async(req, res, next) => {

//     let id = req.params.id
//     let salon = await Salons.findOne({ where: { id: id } })

//     if (!salon) return next(new ErrorHandler("Salon Not Found", 404))

//     res.status(200).json({
//         success: true,
//         salon
//     })

// })



// // Update Salon (Admin)
// const updateSalon = catchAsyncErrors(async(req, res, next) => {

//     // Images Code Will Be done later

//     let id = req.params.id
//     const salon = await Salons.update(req.body, { where: { id: id } })

//     if (!salon) return next(new ErrorHandler("Salon not Found with this Id", 400))

//     res.status(200).json({
//         success: true,
//         message: "Salon Updated Successfully",
//         salon
//     })
// })