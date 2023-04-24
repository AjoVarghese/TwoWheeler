import { adminAddBikeApi, adminSearchBikeApi, deleteBikeAPi, getAllBikesApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getAllBikesAction = (page) => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_BIKES_REQ
    })

     getAllBikesApi(page).then((data) => {
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


export const adminSearchBikeAction = (searchTerm,page) => async(dispatch) => {
    console.log("searchTerm",searchTerm);
    dispatch({
        type : AdminActionTypes.BIKE_SEARCH_REQ
    })

    adminSearchBikeApi(searchTerm,page).then((data) => {
        console.log("adminAddBikeApi",data.data);

        dispatch({
            type : AdminActionTypes.BIKE_SEARCH_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("adminAddBikeApi error",err.response);
        dispatch({
            type : AdminActionTypes.BIKE_SEARCH_FAILED,
            payload : err.response
        })
    })
}
