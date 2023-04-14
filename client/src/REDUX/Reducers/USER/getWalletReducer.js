import { ActionTypes } from "../../Constants/User/ActionTypes";

export const getWalletReducer = (state = {} , {type,payload}) => {
    console.log('walletPayload',payload);
    switch(type) {
        case ActionTypes.GET_WALLET_REQ:
            return {
                loading : true
            }
        case ActionTypes.GET_WALLET_SUCCESS:
            return {
                loading : false,
                walletData : payload
            } 
        case ActionTypes.GET_WALLET_FAILED:
            return {
                loading :false,
                walletDataError : payload
            }       
        default : return state    
    }
}