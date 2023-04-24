import { filterBikesApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const bikeFilterAction = (location,brand,page) => async(dispatch) => {
    dispatch({
        type : ActionTypes.FILTER_REQ
    })

   filterBikesApi(location,brand,page).then((data) => {
    console.log('FILTER API DATA',data.data);
    dispatch({
        type : ActionTypes.FILTER_REQ_SUCCESS,
        payload : data.data
    })
   })

   .catch((err) => {
    console.log('Error in filter API',err.response);
    dispatch({
        type : ActionTypes.FILTER_REQ_FAILED,
        payload : err.response
    })
   })
}