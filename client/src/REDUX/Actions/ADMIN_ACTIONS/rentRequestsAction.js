import { acceptRentRequestsApi, getRentRequetsApi, rejectRentRequetsApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getRentRequests = () => async(dispatch) => {
    dispatch({
        type : AdminActionTypes.GET_RENT_REQUESTS
    })

    getRentRequetsApi().then((data) => {
        console.log('Rent',data.data);
        dispatch({
            type : AdminActionTypes.GET_RENT_REQUESTS_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.GET_RENT_REQUESTS_FAILED,
            payload : err.response.message
        })
    })
}

export const acceptRentRequests = (id,owner) => async(dispatch) => {
    console.log("action id",id,owner);
    dispatch({
        type : AdminActionTypes.ACCEPT_RENT_REQUESTS
    })

    acceptRentRequestsApi(id,owner).then((data) => {
        console.log("acceptRentRequests",data.data);
        dispatch({
            type : AdminActionTypes.ACCEPT_RENT_REQUESTS_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.ACCEPT_RENT_REQUESTS_FAILED,
            payload : err.response.message
        })
    })
}


export const rejectRentRequets = (id) => async(dispatch) => {
    console.log("reject id",id);
    dispatch({
        type : AdminActionTypes.REJECT_RENT_REQUESTS
    })

    rejectRentRequetsApi(id).then((data) => {
        console.log("Rejected api",data.data);
        dispatch({
            type : AdminActionTypes.REJECT_RENT_REQUESTS_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        console.log("reject error:",err);
        dispatch({
            type : AdminActionTypes.REJECT_RENT_REQUESTS_FAILED,
            payload : err.response.message
        })
    })


}