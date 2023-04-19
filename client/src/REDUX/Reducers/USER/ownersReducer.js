import { ActionTypes } from "../../Constants/User/ActionTypes"

export const ownersReducer = (state = {} , {type,payload}) => {
    switch(type) {
        case ActionTypes.GET_OWNERS_REQ : 
            return {
              loading : true
          }
        case ActionTypes.GET_OWNERS_SUCCESS:
            return {
                loading : false,
                ownersData : payload
            } 
        case ActionTypes.GET_OWNERS_FAILED:
            return {
                loading : false,
                ownersDataErro : payload
            }     


      default : return state
    }
    
}