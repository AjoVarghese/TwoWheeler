import { bikeSingleViewApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const bikeViewAction = (id) => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_BIKE_VIEW
    })

    bikeSingleViewApi(id).then((data) => {
        console.log("DATASASTA",data.data);
        dispatch({
            type : AdminActionTypes.GET_BIKE_VIEW_SUCCESS,
            payload : data
        })
    })
    .catch((err) => {
        console.log("SOME ERROR",err);
        dispatch({
            type : AdminActionTypes.GET_BIKE_VIEW_FAILED,
            payload : err.response.message
        })
       
    })
}