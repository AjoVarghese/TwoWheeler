
import { bookBikeApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const bookingAction = (bookingData) => async(dispatch) => {
    console.log("BookingDaa",bookingData);
    dispatch({
        type : ActionTypes.BOOKING_REQ
    })

   
    bookBikeApi(bookingData).then((data) => {
        console.log("bookBIkeAPI",data);
        if(data.data.url){
            
           window.location.href=data.data.url
        }else {
           
            dispatch({
                type : ActionTypes.WALLET_BOOKING_SUCCESS,
                payload : data.data?.message,
            })
        }
        
    })

    .catch((err) => {
       
        dispatch({
            type : ActionTypes.BOOKING_FAILED,
            payload : err.response
        })
    })
}