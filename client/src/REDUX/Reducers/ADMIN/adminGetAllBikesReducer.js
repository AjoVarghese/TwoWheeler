import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const getAllBikesReducer = (state = {} , {type,payload}) => {
    switch(type) {
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

          case AdminActionTypes.ADD_BIKE_SUCCESS : 

          return {
            bikeData:[...state.bikeData,payload]
          }

          // case AdminActionTypes.REMOVE_BIKE:
          //   let bikes = state.bikeData.filter((bikes)=>bikes.id!==payload)

          //   return {bikeData:{...bikes}}
          
        default : return state
    }
}