
import { bookBikeApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const bookingAction = (bookingData) => async(dispatch) => {
    console.log("BookingDaa",bookingData);
    dispatch({
        type : ActionTypes.BOOKING_REQ
    })

    //  const navigate = useNavigate()
    bookBikeApi(bookingData).then((data) => {
        console.log("bookBIkeAPI",data);
        if(data.data.url){
            console.log('stripe url');
           window.location.href=data.data.url
        }else {
            console.log('wallet success');
            dispatch({
                type : ActionTypes.WALLET_BOOKING_SUCCESS,
                payload : data.data?.message,
            })
        }
        
    })

    .catch((err) => {
        console.log('eror in stripe ',err);
        // console.log("bookBikeApi ERRor",err.response);
        dispatch({
            type : ActionTypes.BOOKING_FAILED,
            payload : err.response
        })
    })
}