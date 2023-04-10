import { searchBikesApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const bikeSearchAction = (searchTerm) => async(dispatch) => {
    console.log('search action',searchTerm);
    dispatch({
        type : ActionTypes.GET_SEARCHED_BIKES_REQ
    })

    searchBikesApi(searchTerm).then((data) => {
        console.log("bike search api data",data.data);
        dispatch({
            type : ActionTypes.GET_SEARCHED_BIKES_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        console.log("Search bikes error",err);
        dispatch({
            type : ActionTypes.GET_SEARCHED_BIKES_FAILED,
            payload : err.response
        })
    })
}