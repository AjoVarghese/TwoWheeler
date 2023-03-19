import { ActionTypes } from "../../Constants/User/ActionTypes";

export const userHomeReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.HOME_REQUEST : 
        return {
            loading : true
        }

        case ActionTypes.HOME_REQUEST_SUCCESS : 
        console.log("USER HOME REDUCER DATA",payload);
        return {
            loading : false,
            userHomeData : payload
        }

        case ActionTypes.HOME_REQUEST_FAILED : 
        console.log("USER HOME REDUCER ERROR DATA",payload);
        return {
            loading : true,
            userHomeError : payload
        }

        default : return state
    }
}