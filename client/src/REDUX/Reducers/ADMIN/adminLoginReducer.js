import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const adminLoginReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.LOGIN_REQ : 
         return {
            loading : true
         }

         case AdminActionTypes.LOGIN_REQ_SUCCESS:
           return {
            loading : false,
            adminLoginData : payload
           }

        case AdminActionTypes.LOGIN_REQ_FAILED : 
           return {
            loading :false,
            adminLoginError : payload
           }  
           
        case AdminActionTypes.LOGOUT_REQ : 
        return {
            adminLoginData : false
        }   

         default : return state
    }
}