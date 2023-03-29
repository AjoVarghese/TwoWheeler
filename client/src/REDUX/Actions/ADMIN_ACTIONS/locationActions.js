import { addLocationApi, deleteBikeAPi, getLocationApi } from "../../../API/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"


export const addLocation = (location) => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.ADD_LOCATION_REQ
    })

    addLocationApi(location).then((data) => {
        console.log("location added data",data.data);
        dispatch({
            type : AdminActionTypes.ADD_LOCATION_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("Action err",err);
        dispatch({
            
            type : AdminActionTypes.ADD_LOCATION_FAILED,
            payload : err.response
        })
    })
}


export const getLocation = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_LOCATION_REQ
    })

    getLocationApi().then((data) => {
        console.log("getLocationApi",data.data);
        dispatch({
            type : AdminActionTypes.GET_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.GET_LOCATION_FAILED,
            payload : err.response.message
        })
    })
}

export const deleteLocation = (id) => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.DELETE_LOC_REQ
    })

    deleteBikeAPi(id).then((data) => {
        dispatch({
            type : AdminActionTypes.DELETE_LOC_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.DELETE_LOC_FAILED,
            payload : err.response.message
        })
    })
}