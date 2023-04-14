import { createOrderApi } from "../../../api/User/ApiCalls"
import { ActionTypes } from "../../Constants/User/ActionTypes"

export const createOrderAction = (bookingDetails) => async(dispatch) => {
    console.log("BOOKING DETAILS",bookingDetails);
    dispatch({
        type : ActionTypes.CREATE_ORDER_REQ
    })

    createOrderApi(bookingDetails).then((data) => {
        console.log("createOrderAPI",data.data);
    })
    .catch((err) => {
        console.log("createOrderAPi Error",err);
    })
}