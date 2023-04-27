import { combineReducers } from "redux";
import { getAllBikesReducer } from "./ADMIN/adminGetAllBikesReducer";
import { singleViewBikeReducer } from "./ADMIN/adminGetSingleBikeReducer";
import { adminLoginReducer } from "./ADMIN/adminLoginReducer";
import { adminUserGetReducer } from "./ADMIN/adminUserReducer";
import {  deleteLocationReducer, getLocationReducer } from "./ADMIN/locationReducer";
import { rentRequestsReducer } from "./ADMIN/rentRequetsReducer";

import {  bikesReducer } from "./USER/bikesReducer";
import { imageUploadReducer } from "./USER/imageUploadReducer";
import {  userLocationReducer } from "./USER/locationReducer";
import { getAcceptedDataReducer, getPendingDataReducer, getRejectedDataReducer, getRentedBikesReducer } from "./USER/rentedBikesReducer";
import { userGetProfileReduer } from "./USER/userGetProfileReducer";
import { userHomeReducer } from "./USER/userHomeReducer";
import { userLoginReducer } from "./USER/userLoginReducer";
import { userRegisterReducer } from "./USER/userReducer";
import { getCouponReducer } from "./ADMIN/couponsReducer";
import { rentedBikesReducer } from "./USER/rentedRidesReducer";
import { bookingDetailsReducer } from "./ADMIN/bookingDetailsReducer";
import { getWalletReducer } from "./USER/getWalletReducer";
import { bookingReducer } from "./USER/bookingReducer";
import { ownersReducer } from "./USER/ownersReducer";
import {  getDashBoardDetailsReducer, } from "./ADMIN/DashboardReducer";
import { salesReportReducer } from "./ADMIN/salesReportReducer";

const reducers = combineReducers({
    userRegisterReducer : userRegisterReducer,
    userLoginReducer : userLoginReducer,
    userHomeReducer : userHomeReducer,
    userGetProfileReduer : userGetProfileReduer,
    imageUploadReducer : imageUploadReducer,
    bikesReducer : bikesReducer,
    userLocationReducer : userLocationReducer,
    
    getRentedBikesReducer : getRentedBikesReducer,
    getAcceptedDataReducer : getAcceptedDataReducer,
    getRejectedDataReducer : getRejectedDataReducer,
    getPendingDataReducer : getPendingDataReducer,
    rentedBikesReducer : rentedBikesReducer,
    getWalletReducer : getWalletReducer,
    bookingReducer : bookingReducer,
    ownersReducer : ownersReducer,


    adminLoginReducer : adminLoginReducer,
    adminUserGetReducer : adminUserGetReducer,
    admingetAllBikesReducer :getAllBikesReducer,
    
    singleViewBikeReducer : singleViewBikeReducer,
    rentRequestsReducer : rentRequestsReducer,
    
    getLocationReducer : getLocationReducer,
    deleteLocationReducer : deleteLocationReducer,
    getCouponReducer : getCouponReducer,
    bookingDetailsReducer : bookingDetailsReducer,

    getDashBoardDetailsReducer : getDashBoardDetailsReducer,
    salesReportReducer : salesReportReducer,

})


export default reducers