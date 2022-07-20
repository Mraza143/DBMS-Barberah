const db = require('../models')

const path = require('path');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');



// create main Model
const Product = db.products
const Salons = db.salons
const Barbers = db.barbers;
const Reviews = db.reviews
const Users = db.users
const Appointments = db.appointments


// Main Work
const getAppointments = catchAsyncErrors(async(req, res, next) => {
    const appointments = await Appointments.findAll({})
    res.status(200).send(appointments)
})

const getAppointmentOfASpecificBarber = catchAsyncErrors(async(req, res, next) => {

    const appointments = await Appointments.findOne({
        where: { barberName: req.params.name, salonName: req.params.sname }
        // where: { id: req.params.id }
    })


    res.status(200).json({
        success: true,
        appointments
    })

})

const setAppointment = catchAsyncErrors(async(req, res, next) => {

    let info = {
        customerName: req.body.customerName,
        salonName: req.body.salonName,
        barberName: req.body.barberName,
        price: req.body.price,
        date: req.body.date,
        userId : req.body.user_id
    }

    const appointment = await Appointments.create(info)

    res.status(200).json({
        success: true,
        message: "Appointment Booked Successfully",
        appointment
    })

})

const deleteAppointment = catchAsyncErrors(async(req, res, next) => {

    let id = req.params.id
    const appointment = await Appointments.destroy({
        where: { id: id }
    })

    if (!appointment) return next(new ErrorHandler('Appointment Not Found', 400))

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Appointment Deleted Successfully"
    })

})

const updateAppointment = catchAsyncErrors(async(req, res, next) => {

    let id = req.params.id
    const appointment = await Appointments.update(req.body, {
        where: { id: id }
    })


    res.status(200).json({
        success: true,
        appointment,
        message: "Appointment Updated Successfully"
    })

})



module.exports = {
    getAppointments,
    setAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentOfASpecificBarber

}