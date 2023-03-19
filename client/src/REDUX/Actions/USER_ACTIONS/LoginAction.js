import { userLoginAPi } from "../../../API/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const userLoginAction = (Mobile,Password) => async(dispatch) => {
    try {

        dispatch({
            type : ActionTypes.LOGIN_REQUEST
        })
    
        userLoginAPi(Mobile,Password)

        .then((data) => {
            console.log("USER LOGIN DATA",data.data);
            dispatch(
                {
                    type : ActionTypes.LOGIN_REQUEST_SUCCESS,
                    payload : data.data
                }
            )
            localStorage.setItem("userInfo",JSON.stringify(data.data))
        })

        .catch((error) => {
            console.log(" USER LOGIN ERROR",error.response.data);
            dispatch( 
                {
                    type : ActionTypes.LOGIN_REQUEST_FAILED,
                    payload : error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.response.data,
                }
            )
        })
    } catch (error) {
        
    }
}