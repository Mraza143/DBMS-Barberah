import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from "../constants/userConstant";


export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { 'Content-Type': 'application/json' }, credentials: "include" }


        const { data } = await axios.post(
            `http://localhost:5000/api/users/login`, { email, password },
            config,

        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Logout User
export const logout = () => async(dispatch) => {
    try {
        const config = {
            credentials: "include"
        }
        await axios.get('http://localhost:5000/api/users/logout', config)
            // there is no need to pass data in payload bcoz we haven't pass any data in logout success case

        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        })
    }
}




export const register = (userData) => async(dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = { headers: { 'Content-Type': 'multipart/form-data' }, credentials: "include" }
        const { data } = await axios.post(`http://localhost:5000/api/users/register`, userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get('http://localhost:5000/api/users/me', { credentials: "include" })

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}



// get All Users (Admin)
export const getSalonOwnerUsers = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get(`http://localhost:5000/api/users/salonowner/allusers`)

        dispatch({ type: ALL_USERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
    }
}


// Update User (Admin)
export const salonOwnerUpdateUser = (id, userData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.put(
            `http://localhost:5000/api/users/salonowner/user/${id}`,
            userData,
            config,
        )

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}





// Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}