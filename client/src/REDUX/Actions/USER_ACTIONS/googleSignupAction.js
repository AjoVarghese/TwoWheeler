import { googleSignupApi } from "../../../api/User/ApiCalls";
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const googleSignupAction = (Name,Email,Phone,Photo) => async(dispatch) => {
    console.log(Name);
    try {
        dispatch({
            type : ActionTypes.GOOGLE_SIGNUP_REQ
        })
        const {data} = await googleSignupApi(Name,Email,Phone,Photo)
    
        dispatch({
            type : ActionTypes.GOOGLE_SIGNUP_SUCCESS,
            payload : data
        })
    
         localStorage.setItem("userInfo", JSON.stringify(data))
    
         window.location.href = "/"
    } catch (error) {
        dispatch({
            type : ActionTypes.GOOGLE_SIGNUP_FAILED,
            payload : error.response
        })
    }
   

}