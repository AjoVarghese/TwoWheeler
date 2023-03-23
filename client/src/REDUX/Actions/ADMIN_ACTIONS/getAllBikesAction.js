import { getAllBikesApi } from "../../../API/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getAllBikesAction = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_BIKES_REQ
    })

     getAllBikesApi().then((data) => {
        console.log("getAllBikesAPi",data.data);
        dispatch({
            type : AdminActionTypes.GET_BIKES_SUCCESS,
            payload : data.data
        })
     })
     .catch((err) => {
        dispatch({
            type : AdminActionTypes.GET_BIKES_FAILED,
            payload : err.response.message
        })
     })
}