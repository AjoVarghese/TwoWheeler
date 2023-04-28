import { ActionTypes } from "../../Constants/User/ActionTypes"
import { signUpGoogleApi, userSignupApi } from "../../../api/User/ApiCalls"
import { useNavigate } from "react-router-dom"
import { auth } from "../../../firebase/firebase.config"

// var navigate = useNavigate()
export const userRegister = (data) => async(dispatch) => {
  try {

    // dispatch(
    //     {
    //         type : ActionTypes.REGISTER_REQUEST 
    //     }
    // )

    //  userSignupApi(Name,Email,Mobile,Password,Referral)
   
    // .then((data) => {
      // console.log("API DATA",data.data);
      
      dispatch({
          type : ActionTypes.REGISTER_REQUEST_SUCCESS,
          payload : data
      })

    // })
    // .catch((error) => {
    //   dispatch({
    //     type : ActionTypes.REGISTER_REQUEST_FAILED,
    //     payload : error
    // })
    // console.log(error);
    // })
    
  } catch (error) {
    console.log("ERROR",error);
   
  }
}