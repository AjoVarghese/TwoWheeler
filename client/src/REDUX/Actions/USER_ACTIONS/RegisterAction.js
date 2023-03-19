import { ActionTypes } from "../../Constants/User/ActionTypes"
import { userSignupApi } from "../../../API/User/ApiCalls"

export const userRegister = (Name,Email,Mobile,Password) => async(dispatch) => {
  try {

    dispatch(
        {
            type : ActionTypes.REGISTER_REQUEST 
        }
    )

    // const config = {
    //     headers : {
    //       "Content-Type" : "application/json"
    //     }
    // }

     userSignupApi(Name,Email,Mobile,Password)
    // {
    //     Name,
    //     Email,
    //     Mobile,
    //     Password,
        
    // },
    // config
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