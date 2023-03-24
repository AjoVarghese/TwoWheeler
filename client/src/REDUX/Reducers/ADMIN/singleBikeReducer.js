import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const singleBikeReducer = (state = {} , {type,payload}) => {
    console.log("SINGLE",payload);
    switch(type){
        case AdminActionTypes.GET_SINGLE_BIKE_SUCCESS :
            return {
             singleBikeData : payload
            }

        default : return state    
    }
}