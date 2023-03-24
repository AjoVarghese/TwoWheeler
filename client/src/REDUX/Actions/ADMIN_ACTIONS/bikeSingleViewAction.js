import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const bikeSingleViewAction = (data) => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_SINGLE_BIKE_SUCCESS,
        payload : data
    })
}