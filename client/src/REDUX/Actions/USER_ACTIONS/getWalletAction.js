
import { getWalletApi } from "../../../api/User/ApiCalls";
import { ActionTypes } from "../../Constants/User/ActionTypes"


export const getWalletAction = () => async(dispatch) => {
    dispatch({
        type : ActionTypes.GET_WALLET_REQ
    })

    getWalletApi().then((data) => {
        console.log('walletApi',data.data);
        dispatch({
            type : ActionTypes.GET_WALLET_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log('walletApiError',err.repsonse);
        dispatch({
            type : ActionTypes.GET_WALLET_FAILED,
            payload : err.repsonse
        })
    })
}