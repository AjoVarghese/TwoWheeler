import { getUsersApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const adminUserAction = () => async(dispatch) => {
    try {
        dispatch({
            type : AdminActionTypes.GET_USERS_REQ
        })
        getUsersApi().then((data) => {
            console.log("USERS API DATA",data.data);
          dispatch({
           type : AdminActionTypes.GET_USERS_SUCCESS,
           payload : data.data
          })
         

        })
        .catch((error) => {
            console.log("USERS API EROR" , error);
           dispatch({
            type : AdminActionTypes.GET_USERS_FAILED,
            payload : error.response.message
           })
        })
    } catch (error) {
       
    }
}