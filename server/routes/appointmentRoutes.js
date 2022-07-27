const router = require('express').Router()
const appointmentController = require('../controllers/appointmentController')

router.get('/', appointmentController.getAppointments)
router.get('/:id/:name/:sname', appointmentController.getAppointmentOfASpecificBarber)
router.post('/create', appointmentController.setAppointment)

router.get('/salonowner/appointments', appointmentController.getAdminAppointments)
router.delete('/:id', appointmentController.deleteAppointment)
router.put('/:id', appointmentController.updateAppointment)



module.exports = router