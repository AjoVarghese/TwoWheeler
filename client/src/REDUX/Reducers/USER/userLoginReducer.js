import { ActionTypes } from "../../Constants/User/ActionTypes";

export const userLoginReducer =  (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.LOGIN_REQUEST :
            return {
              loading : true
            }

        case ActionTypes.LOGIN_REQUEST_SUCCESS :
            console.log("userLogiReducerData",payload); 
        return {
            loading : false,
            userLoginDetails : payload
        }  
        
        case ActionTypes.LOGIN_REQUEST_FAILED :
            return {
                loading : false,
                userLoginError : payload
            }
        case ActionTypes.LOGOUT_REQUEST :
            return {userLoginDetails:false}
        
            case ActionTypes.UPDATE_PROFILE :
            return {
                userLoginDetails : payload
            }

        default : return state    
    }
}