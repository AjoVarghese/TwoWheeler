import { ActionTypes } from "../../Constants/User/ActionTypes";

export const bookingReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.BOOKING_REQ:
            return{
                loading : true
            }
        case ActionTypes.BOOKING_SUCCESS : 
           return {
            loading : false,
            bookingSuccessData : payload
           } 
        case ActionTypes.BOOKING_FAILED : 
           return {
            loading : false,
            bookingError : payload
           }       
        default : return state    
    }
}