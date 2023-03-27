import { deleteBikeAPi, getAllBikesApi } from "../../../API/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getAllBikesAction = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_BIKES_REQ
    })

     getAllBikesApi().then((data) => {
        console.log("getAllBikesAPi",data.data);
        dispatch({
            type : AdminActionTypes.GET_BIKES_SUCCESS,
            payload : data.data
        })
     })
     .catch((err) => {
        dispatch({
            type : AdminActionTypes.GET_BIKES_FAILED,
            payload : err.response.message
        })
     })
}

export const deleteBikeAction = (id) => async(dispatch) => {
    console.log("delete id",id);
    dispatch({
        type :AdminActionTypes.DELETE_BIKE_REQ
    })

    deleteBikeAPi(id).then((data) => {
        console.log("delete api return data",data.data);
        
        dispatch({
            type : AdminActionTypes.DELETE_BIKE_SUCCESS,
            payload :data.data
        })
    })
    .catch((err) => {
        console.log("delete error",err);
        dispatch({
            type : AdminActionTypes.DELETE_BIKE_FAILED,
            payload : err.response.message
        })
    })
}