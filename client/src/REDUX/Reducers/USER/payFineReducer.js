import { ActionTypes } from "../../Constants/User/ActionTypes";

export const payFineReducer = (state = {} , {type,payload}) => {
    switch(type) {
        case ActionTypes.PAY_FINE_REQ:
            return {
                loading : true
            }
        case ActionTypes.PAY_FINE_SUCCESS:
            return {
                loading : false,
                payFineData : payload
            }   
        case ActionTypes.PAY_FINE_FAILED:
            return {
                loading : false,
                payFineDataError : payload
            }     
        default : return state    
    }
}