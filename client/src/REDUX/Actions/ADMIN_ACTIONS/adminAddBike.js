import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const adminAddBikeAction = (data) => async(dispatch) => {
    console.log(data);
    dispatch({
        type : AdminActionTypes.ADD_BIKE_SUCCESS,
        payload:data
    })
}