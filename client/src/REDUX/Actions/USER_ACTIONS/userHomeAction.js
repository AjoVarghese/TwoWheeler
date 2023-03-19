import { userHomeApi } from "../../../API/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const userHomeAction = () => async(dispatch) => {
    try {
        dispatch({
            type : ActionTypes.HOME_REQUEST
        })

        userHomeApi().then((data) => {
            console.log("USER HOME",data);
            dispatch({
                type : ActionTypes.HOME_REQUEST_SUCCESS,
                payload : data
            })
            .catch((error) => {
                console.log("USER HOME ERROR",error);
                dispatch({
                    type : ActionTypes.HOME_REQUEST_FAILED,
                    payload : error.response.data
                })
            })
        })
    } catch (error) {
        
    }
}