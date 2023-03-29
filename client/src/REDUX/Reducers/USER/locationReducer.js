import { ActionTypes } from "../../Constants/User/ActionTypes";

export const userLocationReducer = (state={} , {type,payload}) => {
    switch(type){
        case ActionTypes.GET_LOCATION_REQ:
            return {
                loading : true
            }
        
        case ActionTypes.GET_LOCATION_SUCCESS:
            return {
                loading : false,
                locationData : payload
            }    
        
        case ActionTypes.GET_LOCATION_FAILED:
            return{
                loading : false,
                locationDataError : payload
            }    

        default : return state    
    }
}