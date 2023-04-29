import { imageUploadApi, userProfileApi } from "../../../api/User/ApiCalls";
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getUserProfileAction = () => async(dispatch) => {
    try {
        dispatch({
            type : ActionTypes.GET_PROFILE_REQUEST
        })
   let user = JSON.parse(localStorage.getItem('userInfo'))
   console.log("REDCUER USER TOKEN",user.id);
       console.log("...................................");
        userProfileApi(user.id).then((data) => {
            console.log("PROFILE DTAAA",data.data);
            dispatch({
                type : ActionTypes.GET_PROFILE_REQUEST_SUCCESS,
                payload : data.data
            })
        })
        .catch((err) => {
            dispatch({
                type : ActionTypes.GET_PROFILE_REQUEST_FAILED,
                payload : err.response.data
            })
        })
    } catch (error) {
        
    }
}


export const imageUploadAction = (data) => async(dispatch) => {
    try {
         const user = JSON.parse(localStorage.getItem("userInfo"))
        
        // imageUploadApi(user.id,image).then((data) => {
            console.log("imageuploadApiData",data);
            localStorage.setItem("userInfo",JSON.stringify(data))
            dispatch({
                type : ActionTypes.UPDATE_PROFILE,
                payload : data
            })
        // })
    } catch (error) {
        
    }
}

export const updateProfile = (data) => async(dispatch) => {
    console.log("DISPATCH DATA");
    dispatch({
        type : ActionTypes.UPDATE_PROFILE_DETAILS,
        payload : data
    })
}