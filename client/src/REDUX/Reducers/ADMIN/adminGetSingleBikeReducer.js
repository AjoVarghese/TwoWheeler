import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const singleViewBikeReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.GET_BIKE_VIEW : 
         return {
            loading :true
         }
         case AdminActionTypes.GET_BIKE_VIEW_SUCCESS : 
           return {
            loading : false,
            bikeViewData : payload
           } 

        case AdminActionTypes.GET_BIKE_VIEW_FAILED : 
          return {
            loading : false,
            bikeViewDataError : payload
          }   
        default : return state 
    }
}