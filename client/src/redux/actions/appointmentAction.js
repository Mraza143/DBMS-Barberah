import axios from "axios";
import { ALL_APPOINTMENT_REQUEST, ALL_APPOINTMENT_SUCCESS, ALL_APPOINTMENT_FAIL, CLEAR_ERRORS, NEW_APPOINTMENT_REQUEST, NEW_APPOINTMENT_SUCCESS, NEW_APPOINTMENT_FAIL, ADMIN_APPOINTMENT_REQUEST, ADMIN_APPOINTMENT_SUCCESS, ADMIN_APPOINTMENT_FAIL } from "../constants/appointmentsConstant"


export const getAllAppointments = (id, name, sname) => async(dispatch) => {
    try {
        dispatch({ type: ALL_APPOINTMENT_REQUEST })
        const { data } = await axios.get(`http://localhost:5000/api/appointments/${id}/${name}/${sname}`);

        dispatch({
            type: ALL_APPOINTMENT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_APPOINTMENT_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const createAppointmentForCustomers = (customerName, barberName, salonName, date, price, user_id) => async(dispatch) => {
    try {
        dispatch({ type: NEW_APPOINTMENT_REQUEST })
        const { data } = await axios.post("http://localhost:5000/api/appointments/create", customerName, barberName, salonName, date, price, user_id)

        dispatch({
            type: NEW_APPOINTMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_APPOINTMENT_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Get All Salons For Admin
export const getSalonOwnerAppointments = () => async(dispatch) => {
    try {
        dispatch({ type: ADMIN_APPOINTMENT_REQUEST })


        const { data } = await axios.get(`http://localhost:5000/api/appointments/salonowner/appointments`);

        dispatch({
            type: ADMIN_APPOINTMENT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_APPOINTMENT_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}