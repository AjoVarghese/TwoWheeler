import { ActionTypes } from "../../Constants/User/ActionTypes";

export const imageUploadReducer = (state = {} , {type,payload}) => {
    switch(type){
        case ActionTypes.IMAGE_UPLOAD_REQ : 
        return {
            loading : true
        }
        case ActionTypes.IMAGE_UPLOAD_REQ_SUCCESS : 
        return {
            loading:false,
            profileImage : payload
        }
        case ActionTypes.IMAGE_UPLOAD_REQ_FAILED : 
        return {
            loading :false,
            profileImageError : payload
        }
        default : return state
    }
}