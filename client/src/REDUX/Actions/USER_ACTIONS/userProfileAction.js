import { imageUploadApi, userProfileApi } from "../../../API/User/ApiCalls";
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


export const imageUploadAction = (image) => async(dispatch) => {
    try {
        // dispatch({
        //     type : ActionTypes.IMAGE_UPLOAD_REQ
        // })
         const user = JSON.parse(localStorage.getItem("userInfo"))
        // console.log("TOken_id",user.id);
        // imageUploadApi(user.id,image).then((data) => {
        //     console.log("imageuploadApiData",data.data.ProfileImage);
        //     dispatch({
        //         type : ActionTypes.IMAGE_UPLOAD_REQ_SUCCESS,
        //         payload : data.data
        //     })
        // })
        // .catch((err) => {
        //     dispatch({
        //         type : ActionTypes.IMAGE_UPLOAD_REQ_FAILED,
        //         payload : err.response.message
        //     })
        // })
        imageUploadApi(user.id,image).then((data) => {
            console.log("imageuploadApiData",data.data);
            localStorage.setItem("userInfo",JSON.stringify(data.data))
            dispatch({
                type : ActionTypes.UPDATE_PROFILE,
                payload : data.data
            })
        })
    } catch (error) {
        
    }
}