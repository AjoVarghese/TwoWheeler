import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const bookingDetailsReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.GET_BOOKED_DETAILS_REQ:
            return {
                loading : true
            }
        case AdminActionTypes.GET_BOOKED_DETAILS_SUCCESS:
            return {
                loading : false,
                bookedDetails : payload
            } 
        case AdminActionTypes.GET_BOOKED_DETAILS_FAILED : 
            return {
                loading : false,
                bookedDetailsError : payload
            }       
        default : return state    
    }
}