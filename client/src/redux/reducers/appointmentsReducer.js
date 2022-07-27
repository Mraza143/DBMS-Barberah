import { NEW_APPOINTMENT_RESET, ALL_APPOINTMENT_FAIL, ALL_APPOINTMENT_REQUEST, ALL_APPOINTMENT_SUCCESS, CLEAR_ERRORS, NEW_APPOINTMENT_REQUEST, NEW_APPOINTMENT_SUCCESS, NEW_APPOINTMENT_FAIL, ADMIN_APPOINTMENT_REQUEST, ADMIN_APPOINTMENT_SUCCESS, ADMIN_APPOINTMENT_FAIL } from "../constants/appointmentsConstant"



export const appointmentReducer = (state = { appointments: [] }, action) => {

    switch (action.type) {
        case ALL_APPOINTMENT_REQUEST:
        case ADMIN_APPOINTMENT_REQUEST:
            return {
                loading: true,
                appointments: [],
            }

        case ALL_APPOINTMENT_SUCCESS:
            return {
                loading: false,
                appointments: action.payload.appointments,
            }

        case ADMIN_APPOINTMENT_SUCCESS:
            return {
                loading: false,
                appointments: action.payload.appointments,
                appointmentsCount: action.payload.appointmentsCount
            }

        case ALL_APPOINTMENT_FAIL:
        case ADMIN_APPOINTMENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state
    }
}

export const newAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_APPOINTMENT_SUCCESS:
            return {
                loading: false,
                appointment: action.payload.appointment,
                success: action.payload.success
            }
        case NEW_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_APPOINTMENT_RESET:
            return {};
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}