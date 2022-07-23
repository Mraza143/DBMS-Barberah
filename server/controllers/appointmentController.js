const db = require('../models')

const path = require('path');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const Appointments = db.appointments


// Main Work
const getAppointments = catchAsyncErrors(async(req, res, next) => {
    const appointments = await Appointments.findAll({})
    res.status(200).send(appointments)
})

const getAppointmentOfASpecificBarber = catchAsyncErrors(async(req, res, next) => {
    //let barberId =  req.params.id;
    const appointments = await Appointments.findAll({
        where: { barberName: req.params.name, salonName: req.params.sname }
        // where: { id: req.params.id }
    })
    res.status(200).json({
        success: true,
        appointments
    })
    /*
    let barberId =  req.params.id
    const reviews = await Reviews.findAll({ where: { barberId: barberId } })  
   // const reviews = await Reviews.findAll({barberId: req.params.id });
    res.status(200).json({
        success: true,
        reviews
    })

    */

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