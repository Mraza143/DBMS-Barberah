const db = require('../models')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const cloudinary = require("cloudinary")

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Product = db.products
const Salons = db.salons
const Barbers = db.barbers;
const Review = db.reviews

// main work

// 1. create product

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
    res.status(200).send(salon)
        // console.log(salon)


})

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
    createSalon,
    getSalonBarbers,
    getSingleSalon,
    getAllSalons,


}