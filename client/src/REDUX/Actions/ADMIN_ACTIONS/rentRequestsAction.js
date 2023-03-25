import { getRentRequetsApi } from "../../../API/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getRentRequests = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_RENT_REQUESTS
    })

    getRentRequetsApi().then((data) => {
        console.log('Rent',data.data);
        dispatch({
            type : AdminActionTypes.GET_RENT_REQUESTS_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.GET_RENT_REQUESTS_FAILED,
            payload : err.response.message
        })
    })
}