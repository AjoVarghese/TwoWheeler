import { ActionTypes } from "../../Constants/User/ActionTypes"

export const userLogoutAction = () =>async(dispatch) => {
    try {
        localStorage.removeItem("userInfo")
        dispatch({
            type : ActionTypes.LOGOUT_REQUEST
        })
    } catch (error) {
        
    }
}