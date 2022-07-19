const db = require("../models")
const sendToken = require("../utils/jwtToken")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// create main Model
const User = db.users


// Main Work


// Register User
const registerUser = catchAsyncErrors(async(req, res, next) => {

    const { name, email, password, role } = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role,
    })


    sendToken(user, 201, res)

})


// Logging User
const loginUser = catchAsyncErrors(async(req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email and Password', 400))
    }

    const user = await User.findAll({
        where: { email: email }
    }).select('+password')


    if (!user) return next(new ErrorHandler('Invalid Email or Password', 401))

    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) return next(new ErrorHandler('Password does not Match', 401))

    sendToken(user, 200, res)

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










module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}