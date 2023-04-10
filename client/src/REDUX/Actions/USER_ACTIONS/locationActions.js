import { userGetLocationApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const userGetLocation = () => async(dispatch) => {
    dispatch({
        type : ActionTypes.GET_LOCATION_REQ
    })

    userGetLocationApi().then((data) => {
        console.log("User locatiojs",data.data);
        dispatch({
            type : ActionTypes.GET_LOCATION_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("user loc err",err);
        dispatch({
            type : ActionTypes.GET_LOCATION_FAILED,
            payload : err.response.message
        })
    })
}