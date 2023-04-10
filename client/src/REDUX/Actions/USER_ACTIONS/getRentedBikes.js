import { userGetRentedBikesAPi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getRentedBikesAction = () => async(dispatch) =>{
    dispatch({
        type : ActionTypes.GET_RENTED_BIKES_REQ
    })

    userGetRentedBikesAPi().then((data) => {
        console.log("userGetRentedBikesAPi",data.data);
        dispatch({
            type : ActionTypes.GET_RENTED_BIKES_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log("error in userGetRentedBikesAPi",err.response);
        dispatch({
            type : ActionTypes.GET_RENTED_BIKES_FAILED,
            payload : err.response.message
        })
    })
}

// export const getAcceptedDataAction = () => async(dispatch) => {
//     dispatch({
//         type : ActionTypes.GET_ACCEPTED_BIKES_REQ
//     })

//     getAcceptedBikesApi().then((data) => {
//         console.log("Accepted",data.data);
//         dispatch({
//             type : ActionTypes.GET_ACCEPTED_BIKES_SUCCESS,
//             payload : data.data
//         })
//     })
//     .catch((err) => {
//         console.log("acc err",err);
//         dispatch({
//             type : ActionTypes.GET_ACCEPTED_BIKES_FAILED,
//             payload : err.response
//         })
//     })
// }

// export const getRejectedDataAction = () => async(dispatch) => {
//     dispatch({
//         type : ActionTypes.GET_REJECTED_BIKES_REQ
//     })

//     getRejectedBikesApi().then((data) => {
//         console.log("rej data",data.data);
//         dispatch({
//             type : ActionTypes.GET_REJECTED_BIKES_SUCCESS,
//             payload : data.data
//         })
//     })
//     .catch((err) => {
//         console.log('rej err',err);
//         dispatch({
//             type : ActionTypes.GET_REJECTED_BIKES_FAILED,
//             payload : err.response
//         })
//     })
// }

// export const getPendingDataAction = () => async(dispatch) => {
//     dispatch({
//         type : ActionTypes.GET_PENDING_BIKES_REQ
//     })

//     getPendingBikesApi().then((data) => {
//         console.log("pen data",data.data);
//         dispatch({
//             type : ActionTypes.GET_PENDING_BIKES_SUCCESS,
//             payload : data.data
//         })
//     })
//     .catch((err) => {
//         console.log('pen err',err);
//         dispatch({
//             type : ActionTypes.GET_PENDING_BIKES_FAILED,
//             payload : err.response
//         })
//     })
// }

// export const getRejected = () => async(dispatch) => {
//     console.log("REJECTED");
//     dispatch({
//         type : ActionTypes.GET_REJECTED_REQ
//     })
// }

// export const getPending= () => async(dispatch) => {
//     console.log("PENDING");
//     dispatch({
//         type : ActionTypes.GET_PENDING_REQ
//     })
// }