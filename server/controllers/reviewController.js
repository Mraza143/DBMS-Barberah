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
const Reviews = db.reviews;

// main work

// 1. create Barber

const addReview = async(req, res) => {

    let info = {
        barberName: req.body.barberName,
        customerName: req.body.customerName,
        rating: req.body.rating,
        comment:req.body.comment,
        average: req.body.average,
        barberId:req.body.barber_id


    }

    const review = await Reviews.create(info)
    res.status(200).send(review)
    console.log(review)

}

// Get All Barbers 
const getAllReviews = catchAsyncErrors(async(req, res, next) => {
    /*let worksAt = req.params.name
    const barbers = await Barbers.findAll({ where: { worksAt: worksAt } })
    res.status(200).json({
        success: true,
        barbers
    })*/ 
    let barberId =  req.params.id
    const reviews = await Reviews.findAll({ where: { barberId: barberId } })  
   // const reviews = await Reviews.findAll({barberId: req.params.id });
    res.status(200).json({
        success: true,
        reviews
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
    const updatedBarberRatings = await Barbers.update(req.body, { where: { id: id } })

    res.status(200).json({
        success: true,
        message: "Barber Ratings Updated SuccessFully",
        updatedBarberRatings
    })


})

// Get Barbers By Location
const getBarbersByLocation = catchAsyncErrors(async(req, res, next) => {

    let worksAt = req.params.name
    const barbers = await Barbers.findOne({ where: { worksAt: worksAt } })
    res.status(200).json({
        success: true,
        barbers
    })

})

// Get Barbers By Url

// Images method will determine this function







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










// 2. get all products

/*const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)

}

// 4. update Product

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { published: true }})

    res.status(200).send(products)

}

// 7. connect one to many relation Product and Reviews

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

/*const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')



*/





module.exports = {
    addReview,
    getAllReviews

}