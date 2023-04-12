import { getBookedDetailsApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const bookingDetailsAction = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_BOOKED_DETAILS_REQ
    })

    getBookedDetailsApi().then((data) => {
        console.log("getBookedDetailsApi",data.data);
        dispatch({
            type : AdminActionTypes.GET_BOOKED_DETAILS_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        console.log('getBookedDetailsApiError',err);
        dispatch({
            type : AdminActionTypes.GET_BOOKED_DETAILS_FAILED,
            payload : err.response
        })
    })
}