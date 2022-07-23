import axios from "axios";
import { ALL_SALON_REQUEST, ALL_SALON_SUCCESS, ALL_SALON_FAIL, ADMIN_SALON_REQUEST, ADMIN_SALON_SUCCESS, ADMIN_SALON_FAIL, NEW_SALON_REQUEST, NEW_SALON_SUCCESS, NEW_SALON_FAIL, CLEAR_ERRORS } from "../constants/salonConstant";




// Get all salons at home page
export const getAllSalons = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_SALON_REQUEST })


        const { data } = await axios.get(`http://localhost:5000/api/salons/allSalons`);


        dispatch({
            type: ALL_SALON_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_SALON_FAIL,
            payload: error.response.data.message,
        })
    }
}


















// Create Salon (Admin)
export const createSalon = (salonData) => async(dispatch) => {
    try {
        dispatch({ type: NEW_SALON_REQUEST })

        const config = {
            headers: { 'Content-Type': 'application/json' },
        }

        const { data } = await axios.post(
            'http://localhost:5000/api/salons/salonowner/newsalon',
            salonData,
            config,
        )

        dispatch({
            type: NEW_SALON_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_SALON_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}