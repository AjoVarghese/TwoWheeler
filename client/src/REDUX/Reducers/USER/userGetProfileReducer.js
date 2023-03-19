import { ActionTypes } from "../../Constants/User/ActionTypes";

export const userGetProfileReduer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.GET_PROFILE_REQUEST:

            return {
                loading : true
            }

        case ActionTypes.GET_PROFILE_REQUEST_SUCCESS :
            return {
                loading : false,
                UserProfileData : payload
            } 
            
         case ActionTypes.GET_PROFILE_REQUEST_FAILED : 
           return{
            loading : false,
            error : payload
           } 

           default :
           return state;
    }
}