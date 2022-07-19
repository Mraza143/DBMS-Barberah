const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
    //const fileUpload = require('express-fileupload')
var path = require('path');
var cors = require('cors')
const errorMiddleware = require('./middleware/error')
    // const dotenv = require("dotenv")



// Config
// require('dotenv').config({ path: '../.env' })
// dotenv.config({ path: '../confidentials.env' })


// Builtin Middlewares
const corsOptions = {
    origin: true,
    // origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
//app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());






// Routes 

// const router = require('./routes/productRoutes.js')
// app.use('/api/products', router)
const user = require('./routes/userRoutes.js')
app.use('/api/users', user)


module.exports = app