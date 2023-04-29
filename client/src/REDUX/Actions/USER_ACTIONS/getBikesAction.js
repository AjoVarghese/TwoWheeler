import { getHomeBikesActionApi, userGetBikesApi } from "../../../api/User/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getBikesAction = (page) => async(dispatch) => {
    dispatch({
       type : ActionTypes.GET_BIKES_REQ
    })

    userGetBikesApi(page).then((data) => {
        console.log("userGetBikesApi",data.data);
        dispatch({
            type : ActionTypes.GET_BIKES_SUCCESS,
            payload : data.data
        })
    })

    .catch((error) => {
        console.log('userGETBIKE API ERROR',error);
        dispatch({
            type : ActionTypes.GET_BIKES_FAILED,
            payload : error
        })
    })
}

export const homeGetBikesAction = () => async(dispatch) => {
    dispatch({
        type : ActionTypes.GET_HOME_BIKES_REQ
    })

    getHomeBikesActionApi().then((data) => {
        console.log("HOME BIKES API",data.data);
        dispatch({
            type : ActionTypes.GET_HOME_BIKES_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("HOME BIKES API ERROR",err);
        dispatch({
            type : ActionTypes.GET_HOME_BIKES_FAILED,
            payload : err.response
        })
    })
}