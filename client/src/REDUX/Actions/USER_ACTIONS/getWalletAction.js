import { ActionTypes } from "../../Constants/User/ActionTypes"

export const getWalletAction = () => async(dispatch) => {
    dispatch({
        type : ActionTypes.GET_WALLET_REQ
    })
}