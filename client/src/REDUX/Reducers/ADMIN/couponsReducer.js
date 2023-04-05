import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const getCouponReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.GET_COUPONS_REQ:
          return {
            loading : true
          }
        case AdminActionTypes.GET_COUPONS_SUCCESS:
            return{
                loading : false,
                couponData : payload 
            }  
        case AdminActionTypes.GET_COUPONS_FAILED :
            return {
                loading : false,
                couponDataError : payload
            }
         case AdminActionTypes.EDIT_COUPON_SUCCESS : 
           return {
            loading : false,
            couponData : payload
           }  
        case AdminActionTypes.EDIT_COUPON_FAILED:
            return{
                loading : false,
                couponDataError : payload
            }  
        case  AdminActionTypes.DELETE_COUPON_SUCCESS:
            return{
                loading : false,
                couponData : payload
            }  
        case AdminActionTypes.DELETE_COUPON_FAILED:
            return{
                loading : false,
                couponDataError : payload
            }        
        default : return state  
    }
}