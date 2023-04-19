import { getAllOwnersApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getAllOwnersAction = () => async(dispatch) => {
    
    dispatch({
        type : ActionTypes.GET_OWNERS_REQ,
    })

    getAllOwnersApi().then((data) => {
        console.log("Owners api",data.data);
      dispatch({
        type : ActionTypes.GET_OWNERS_SUCCESS,
        payload : data.data
      })
    })

    .catch((err) => {
        console.log('err in getOwners API',err);
        dispatch({
            type : ActionTypes.GET_OWNERS_FAILED,
            payload : err.reponse
        })
    })
}