import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const adminUserGetReducer = (state = {} , {type,payload}) => {
    switch(type) {
        case AdminActionTypes.GET_USERS_REQ : 
         return {
            loading : true
         }

        case AdminActionTypes.GET_USERS_SUCCESS :
            return {
                loading : false,
                adminUserData : payload
            } 

        case AdminActionTypes.GET_USERS_FAILED : 
            return {
                loading : false,
                adminUserDataError : payload
            }    
        default : return state 
    }
}