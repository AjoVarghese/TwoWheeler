import { ActionTypes } from "../../Constants/User/ActionTypes";

export const getRentedBikesReducer = (state = {} , {type,payload}) => {
    console.log("getRentedBikesReducer",payload);
    switch(type){
        case ActionTypes.GET_RENTED_BIKES_REQ:
            return{
                loading : true
            }

        case ActionTypes.GET_RENTED_BIKES_SUCCESS:
            return {
                loading : false,
                rentedBikesData : payload
            }  
            
        case ActionTypes.GET_RENTED_BIKES_FAILED : 
            return {
                loading : false,
                rentedBikesDataError : payload
            }    

        // case ActionTypes.GET_REJECTED_REQ:
        //     console.log('cxcxcxcxcxc');
        //     console.log("rentedBkeData",state.rentedBikesData);
        //   let rejected= state.rentedBikesData.filter((bikes) =>  bikes.Status === 'Rejected'  )
        //   return{
        //     rejectedData : [...rejected]
        //   }

        //   case ActionTypes.GET_PENDING_REQ:
        //     console.log("pending action");
        //     let pending = state.rentedBikesData.filter((bikes) => bikes.Status === 'Pending')
        //     return{
        //         pendingData : [...pending]
        //     }

        default : return state    
    }
}

export const getAcceptedDataReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.GET_ACCEPTED_BIKES_REQ:
          return{
            loading : true
          }

        case ActionTypes.GET_ACCEPTED_BIKES_SUCCESS:
            return {
                loading : false,
                acceptedData : payload
            }  

        case ActionTypes.GET_ACCEPTED_BIKES_FAILED:
            return {
                loading : false,
                acceptedDataError : payload
            }             

        default : return state   
    }
}

export const getRejectedDataReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.GET_REJECTED_BIKES_REQ:
          return{
            loading : true
          }

        case ActionTypes.GET_REJECTED_BIKES_SUCCESS:
            return {
                loading : false,
                rejectedData : payload
            }  

        case ActionTypes.GET_REJECTED_BIKES_FAILED:
            return {
                loading : false,
                rejectedDataError : payload
            }             

        default : return state   
    }
}

export const getPendingDataReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.GET_PENDING_BIKES_REQ:
          return{
            loading : true
          }

        case ActionTypes.GET_PENDING_BIKES_SUCCESS:
            return {
                loading : false,
                pendingData : payload
            }  

        case ActionTypes.GET_PENDING_BIKES_FAILED:
            return {
                loading : false,
                pendingDataError : payload
            }             

        default : return state   
    }
}