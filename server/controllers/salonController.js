const db = require('../models')

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

const addSalon = async(req, res) => {

    let info = {
        image: req.file.path,
        name: req.body.name,
        timings: req.body.timings,
        location: req.body.location,

    }

    const salon = await Salons.create(info)
    res.status(200).send(salon)
    console.log(salon)

}

const getAllSalons = async(req, res) => {

    let salons = await Salons.findAll({})
    res.status(200).send(salons)

}

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


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'server/Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)  
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).single('image')

// -----------------
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
    addSalon,
    getSalonBarbers,
    getAllSalons,


}