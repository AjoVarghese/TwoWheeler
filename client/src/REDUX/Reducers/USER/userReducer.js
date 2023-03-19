import { ActionTypes } from "../../Constants/User/ActionTypes";

export const userRegisterReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.REGISTER_REQUEST : 
        return {
            loading : true
        }
        case ActionTypes.REGISTER_REQUEST_SUCCESS :
            return {
                registerData : payload
            }
        case ActionTypes.REGISTER_REQUEST_FAILED :
            return {
                loading : true,
                registerError : payload
            }    
       default :
            return state 
    }
}