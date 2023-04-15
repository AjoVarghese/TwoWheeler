import { addCouponApi, deleteCouponApi, editCouponApi, getCouponsApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getCoupons = () => async(dispatch) => {
    try {
        dispatch({
            type : AdminActionTypes.GET_COUPONS_REQ
        })

        getCouponsApi().then((data) => {
            console.log('couponsApi',data.data);
            dispatch({
                type : AdminActionTypes.GET_COUPONS_SUCCESS,
                payload : data.data
            })
        })
        .catch((err) => {
            console.log("getcoupons Api error",err);
            dispatch({
                type : AdminActionTypes.GET_COUPONS_FAILED,
                payload : err.response
            })
        })
    } catch (error) {
        
    }
}

export const addCoupon = (couponName,couponCode,couponPrice) => async(dispatch) => {
    console.log('////////////');
    dispatch({
        type : AdminActionTypes.ADD_COUPON_REQ
    })
    addCouponApi(couponName,couponCode,couponPrice).then((data) => {
        dispatch({
            type : AdminActionTypes.ADD_COUPON_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        dispatch({
            type : AdminActionTypes.ADD_COUPON_FAILED,
            payload : err.response
        })
    })
}


export const editCoupon = (id,couponName,couponCode) => async(dispatch) => {

  editCouponApi(id,couponName,couponCode).then((data) => {
    console.log("Edit couponApi",data.data);
    dispatch({
        type : AdminActionTypes.EDIT_COUPON_SUCCESS,
        payload : data.data
    })
  })
  .catch((err) => {
    console.log("EDIT COUPONS ERR",err);
    dispatch({
        type : AdminActionTypes.EDIT_COUPON_FAILED,
        payload : err.response
    })
  })
}


export const deleteCoupon = (id) => async(dispatch) => {

    deleteCouponApi(id).then((data) => {
        dispatch({
            type : AdminActionTypes.DELETE_COUPON_SUCCESS,
            payload : data.data
        })
    })
    .catch((err) => {
        console.log("del coup err",err);
        dispatch({
            type : AdminActionTypes.DELETE_COUPON_FAILED,
            payload : err.response
        })
    })
   
}