import { rentedRidesApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const rentedRidesAction = () => async(dispatch) => {
    dispatch({
        type : ActionTypes.GET_RENTED_RIDES_REQ
    })

    rentedRidesApi().then((data) => {
        console.log("rideAPi",data.data);
        dispatch({
            type : ActionTypes.GET_RENTED_RIDES_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        console.log('rentedRidesApi Error',err);
        dispatch({
            type : ActionTypes.GET_RENTED_RIDES_FAILED,
            payload : err.reponse
        })
    })
}