import { ActionTypes } from "../../Constants/User/ActionTypes"
import { signUpGoogleApi, userSignupApi } from "../../../API/User/ApiCalls"
import { useNavigate } from "react-router-dom"

// var navigate = useNavigate()
export const userRegister = (Name,Email,Mobile,Password) => async(dispatch) => {
  try {

    dispatch(
        {
            type : ActionTypes.REGISTER_REQUEST 
        }
    )

     userSignupApi(Name,Email,Mobile,Password)
   
    .then((data) => {
      console.log("API DATA",data.data);
      dispatch({
          type : ActionTypes.REGISTER_REQUEST_SUCCESS,
          payload : data
      })

    })
    .catch((error) => {
      dispatch({
        type : ActionTypes.REGISTER_REQUEST_FAILED,
        payload : error
    })
    console.log(error);
    })
    
  } catch (error) {
    console.log("ERROR",error);
   
  }
}

export const signUpGoogle = (accessToken,navigate) => async(dispatch) => {
  try {
      const {data} = await signUpGoogleApi(accessToken)

      dispatch({
        type : ActionTypes.REGISTER_REQUEST_SUCCESS,
        payload : data,
        // navigate('/')
      })
  } catch (error) {
    
  }
}