import { payFineApi, paymentSuccessApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const payFineAction = (fineDetails) => async(dispatch) => {
   dispatch({
    type : ActionTypes.PAY_FINE_REQ
   }) 

   payFineApi(fineDetails).then((data) => {
    console.log("PAY FINE API",data);
    if(data.data.url){
        window.location.href=data.data.url
    }
   })

   .catch((err) => {
    console.log('Error in pay fine',err);
    dispatch({
        type : ActionTypes.PAY_FINE_FAILED,
        payload : err.response
    })
   })
}

export const paymentSuccessAction = (fineDetails) => async(dispatch) => {

    paymentSuccessApi(fineDetails).then((data) =>{
        console.log('payment success api',data);
        dispatch({
            type : ActionTypes.PAYMENT_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log('fine api error',err);
        dispatch({
            type : ActionTypes.PAYMENT_FAILED,
            payload : err.response
        })
    })
}