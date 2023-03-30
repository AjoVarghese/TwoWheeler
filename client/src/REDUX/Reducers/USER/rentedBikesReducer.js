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

        case ActionTypes.GET_ACCEPTED_REQ:
            console.log('cxcxcxcxcxc');
            console.log("rentedBkeData",state.rentedBikesData);
          let result= state.rentedBikesData.filter((bikes) =>  bikes.Status === 'Rejected'  )
          return{
            rentedBikesData : [{...result}]
          }


            
           
       

        default : return state    
    }
}