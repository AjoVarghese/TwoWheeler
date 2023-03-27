import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const rentRequestsReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.GET_RENT_REQUESTS :
             return {
                loading : true
             }

        case AdminActionTypes.GET_RENT_REQUESTS_SUCCESS:
            return {
                loading : false,
                rentRequestsData : payload,
            }    
            
        case AdminActionTypes.GET_RENT_REQUESTS_FAILED:
            return {
                loading : false,
                rentRequestsError : payload
            }  
            
        case AdminActionTypes.ACCEPT_RENT_REQUESTS:
            return {
                loading : true
            }

        case AdminActionTypes.ACCEPT_RENT_REQUESTS_SUCCESS:
            return {
                loading : false,
                rentRequestsData : payload
            }    

        case AdminActionTypes.ACCEPT_RENT_REQUESTS_FAILED:
            return{
                loading : false,
                rentRequestsError : payload
            }    

         case AdminActionTypes.REJECT_RENT_REQUESTS:
            return{
                loading : true
            }   

         case AdminActionTypes.REJECT_RENT_REQUESTS_SUCCESS:
            return{
                loading : false,
                rentRequestsData : payload
            }

         case AdminActionTypes.REJECT_RENT_REQUESTS_FAILED:
            return{
                loading : false,
                rentRequestsError : payload
            }   
        default : return state     
    }
}