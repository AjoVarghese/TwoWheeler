import { ActionTypes } from "../../Constants/User/ActionTypes";

export const rentedBikesReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.GET_RENTED_RIDES_REQ :
            return {
                loading : true
            }
        case ActionTypes.GET_RENTED_RIDES_SUCCESS:
            return {
                loading : false,
                rentedRidesData : payload
            }
        case ActionTypes.GET_RENTED_RIDES_FAILED:
            return {
                loading : false,
                rentedRidesDataError : payload
            }    

        case ActionTypes.CANCEL_RIDE_SUCCESS : 
            return {
                loading : false,
                rentedRidesData : payload
            }  
        case ActionTypes.CANCEL_RIDE_FAILED:
            return {
                loading : false,
                rentedRidesDataError : payload
            } 
        case ActionTypes.END_RIDE_SUCCESS :
            return {
                loading : false,
                rentedRidesData : payload
            }  
        case ActionTypes.PAYMENT_SUCCESS:
            return {
                loading : false,
                rentedRidesData : payload
            }       
        case ActionTypes.PAYMENT_FAILED:
            return {
                loading : false,
                rentedRidesDataError : payload
            }        
        default : return state    
    }
}