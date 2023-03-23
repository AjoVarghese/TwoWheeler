import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const bikesReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.GET_BIKES_REQ : 
          return {
            loading : true
          }

        case AdminActionTypes.GET_BIKES_SUCCESS : 
          return {
            loading : false,
            bikesData : payload
          }  

        case AdminActionTypes.GET_BIKES_FAILED : 
          return {
            loading : false,
            bikesDataError : payload
          }  
        
          default : return state
    }
}