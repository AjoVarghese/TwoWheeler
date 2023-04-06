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

            case ActionTypes.UPDATE_PROFILE_DETAILS :
                return{
                    userLoginDetails : payload
                }
        case ActionTypes.GOOGLE_SIGNUP_REQ : 
          return {
            loading : true
          }   
        case ActionTypes.GOOGLE_SIGNUP_SUCCESS:
            return{
                loading : false,
                userLoginDetails : payload
            }     
        case ActionTypes.GOOGLE_SIGNUP_FAILED:
            return{
                loading : false,
                userLoginError : payload
            }       

        default : return state    
    }
}