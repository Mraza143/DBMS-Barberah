const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
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
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// app.use('/Images', express.static('./Images'));






// Routes 

const product = require('./routes/productRoutes.js')
const user = require('./routes/userRoutes.js')
const salon = require('./routes/salonRoutes.js')
const barber = require('./routes/barberRoutes.js')
const appointment = require('./routes/appointmentRoutes.js')
const review = require('./routes/reviewRoutes.js')

app.use('/api/products', product)
app.use('/api/users', user)
app.use('/api/salons', salon)
app.use('/api/barbers', barber)
app.use('/api/appointments', appointment)
app.use('/api/reviews', review)



module.exports = app