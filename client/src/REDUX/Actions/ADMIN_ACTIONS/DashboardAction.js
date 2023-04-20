import { cancelledBookingsApi, getAllBookingsApi, getDashBoardDetailsApi, getOnRideBookingsApi, getPendingBookingsApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getDashBoardDetailsAction = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_DASHBOARD_DETAILS_REQ
    })

    getDashBoardDetailsApi().then((data) => {
        console.log('DasHBOARD API',data.data);
        dispatch({
            type : AdminActionTypes.GET_DASHBOARD_DETAILS_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("DASHBOARD API ERROR",err);
        dispatch({
            type : AdminActionTypes.GET_DASHBOARD_DETAILS_FAILED,
            payload : err.response
        })
    })
}

