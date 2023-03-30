import { userGetRentedBikesAPi } from "../../../API/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getRentedBikesAction = () => async(dispatch) =>{
    dispatch({
        type : ActionTypes.GET_RENTED_BIKES_REQ
    })

    userGetRentedBikesAPi().then((data) => {
        console.log("userGetRentedBikesAPi",data.data);
        dispatch({
            type : ActionTypes.GET_RENTED_BIKES_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("error in userGetRentedBikesAPi",err.response);
        dispatch({
            type : ActionTypes.GET_RENTED_BIKES_FAILED,
            payload : err.response.message
        })
    })
}

export const getAccepted = () => async(dispatch) => {
    console.log("ACCEPTED");
    dispatch({
        type : ActionTypes.GET_ACCEPTED_REQ
    })
}