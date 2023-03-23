import { userGetBikesApi } from "../../../API/User/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getBikesAction = () => async(dispatch) => {
    dispatch({
       type : ActionTypes.GET_BIKES_REQ
    })

    userGetBikesApi().then((data) => {
        console.log("userGetBikesApi",data.data);
        dispatch({
            type : ActionTypes.GET_BIKES_SUCCESS,
            payload : data.data
        })
    })

    .catch((error) => {
        dispatch({
            type : ActionTypes.GET_BIKES_FAILED,
            payload : error.response.message
        })
    })
}