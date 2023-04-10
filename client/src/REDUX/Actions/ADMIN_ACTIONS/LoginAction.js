import { adminLoginApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const LoginAction = (Email,Password) => async(dispatch) => {
    console.log();
    dispatch({
        type : AdminActionTypes.LOGIN_REQ
    })

    adminLoginApi(Email,Password).then((data) => {
        console.log("ADMINLOGINDATA",data);
        dispatch({
            type : AdminActionTypes.LOGIN_REQ_SUCCESS,
            payload : data.data
        })

        localStorage.setItem("adminInfo",JSON.stringify(data.data))

        
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.LOGIN_REQ_FAILED,
            payload : err.response.message
        })
    })
} 