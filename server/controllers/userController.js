const db = require("../models")
const sendToken = require("../utils/jwtToken")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary")



// create main Model
const Users = db.users;
const Appointments = db.appointments;



// Register User
const registerUser = catchAsyncErrors(async(req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'dbms_userimages',
        width: 150,
        crop: 'scale',
    })

    const { name, email, password, role } = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt);


    const user = await Users.create({
        name,
        email,
        password: hashPassword,
        // password,
        role,
        image: myCloud.secure_url
    })

    const userId = user.id
    const accessToken = jwt.sign({ userId }, "makfi09q39r1q8nkg0fafonla", { expiresIn: "2d" })

    const cookieOptions = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.status(200).cookie('token', cookieOptions).json({
        success: true,
        user,
        accessToken
    })


})


// Logging User
const loginUser = catchAsyncErrors(async(req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email and Password', 400))
    }

    const user = await Users.findAll({
            where: { email: email }
        })
        // .select('+password')

    const userId = user[0].id
        // const userId = user.id
    const accessToken = jwt.sign({ userId }, "makfi09q39r1q8nkg0fafonla", { expiresIn: "2d" })

    if (!user) return next(new ErrorHandler('Invalid Email or Password', 401))

    console.log("Password " + password + " User 0 Password" + user[0].password)

    const isPasswordMatched = await bcrypt.compare(password, user[0].password)
    if (!isPasswordMatched) return next(new ErrorHandler('Password does not Match', 401))

    const cookieOptions = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.status(200).cookie('token', accessToken, cookieOptions).json({
        success: true,
        user,
        accessToken
    })

})

// Logging User
const logoutUser = catchAsyncErrors(async(req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out Successfully'
    })

})

const getUserAppointments = async(req, res) => {
    const id = req.params.id
    const data = await Users.findOne({
        include: [{
            model: Appointments,
            as: 'appointments'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}






module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserAppointments,
}