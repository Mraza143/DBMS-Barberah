const db = require('../models')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const cloudinary = require("cloudinary")


const Salons = db.salons
const Barbers = db.barbers;




const adminCreateSalon = catchAsyncErrors(async(req, res, next) => {

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
        latitude: req.body.latitude,
        langitude: req.body.langitude
    }

    const salon = await Salons.create(info)

    res.status(200).json({
            success: true,
            salon
        })
        // console.log(salon)


    /*
    INSERT INTO `salons` (`id`,`image`,`name`,`location`,`timings`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?,?,?); */


})


const getAdminSalons = catchAsyncErrors(async(req, res, next) => {

    let salonsCount = await Salons.count()
    let salons = await Salons.findAll({})
    res.status(200).json({
        success: true,
        salons,
        salonsCount
    })

})


// Get Single Salon by id in specific salon
const getSingleSalon = catchAsyncErrors(async(req, res, next) => {

    let id = req.params.id
    let salon = await Salons.findOne({ where: { id: id } })
    res.status(200).json({
        success: true,
        salon
    })

    /*
     SELECT `id`, `image`, `name`, `location`, `timings`, `createdAt`, `updatedAt` FROM `salons` AS `salons` WHERE `salons`.`id` = '1';
     */

})

const getAllSalons = catchAsyncErrors(async(req, res, next) => {

    let salons = await Salons.findAll({})
    res.status(200).json({
        success: true,
        salons
    })

    /* SELECT `id`, `image`, `name`, `location`, `timings`, `createdAt`, `updatedAt` FROM `salons` AS `salons`; */
})


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
    adminCreateSalon,
    getSalonBarbers,
    getAdminSalons,
    getSingleSalon,
    getAllSalons,
}