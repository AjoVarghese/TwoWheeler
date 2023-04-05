import { combineReducers } from "redux";
import { adminBikesReducer } from "./ADMIN/adminBIkesReducer";
import { getAllBikesReducer } from "./ADMIN/adminGetAllBikesReducer";
import { singleViewBikeReducer } from "./ADMIN/adminGetSingleBikeReducer";
import { adminLoginReducer } from "./ADMIN/adminLoginReducer";
import { adminUserGetReducer } from "./ADMIN/adminUserReducer";
import { addLocationReducer, deleteLocationReducer, getLocationReducer } from "./ADMIN/locationReducer";
import { rentRequestsReducer } from "./ADMIN/rentRequetsReducer";
import { singleBikeReducer } from "./ADMIN/singleBikeReducer";
import { bikeSearchReducer, bikesReducer } from "./USER/bikesReducer";
import { imageUploadReducer } from "./USER/imageUploadReducer";
import { locationReducer, userLocationReducer } from "./USER/locationReducer";
import { getAcceptedDataReducer, getPendingDataReducer, getRejectedDataReducer, getRentedBikesReducer } from "./USER/rentedBikesReducer";
import { userGetProfileReduer } from "./USER/userGetProfileReducer";
import { userHomeReducer } from "./USER/userHomeReducer";
import { userLoginReducer } from "./USER/userLoginReducer";
import { userRegisterReducer } from "./USER/userReducer";
import { getCouponReducer } from "./ADMIN/couponsReducer";

const reducers = combineReducers({
    userRegisterReducer : userRegisterReducer,
    userLoginReducer : userLoginReducer,
    userHomeReducer : userHomeReducer,
    userGetProfileReduer : userGetProfileReduer,
    imageUploadReducer : imageUploadReducer,
    bikesReducer : bikesReducer,
    userLocationReducer : userLocationReducer,
    // bikeSearchReducer  : bikeSearchReducer,
    getRentedBikesReducer : getRentedBikesReducer,
    getAcceptedDataReducer : getAcceptedDataReducer,
    getRejectedDataReducer : getRejectedDataReducer,
    getPendingDataReducer : getPendingDataReducer,


    adminLoginReducer : adminLoginReducer,
    adminUserGetReducer : adminUserGetReducer,
    admingetAllBikesReducer :getAllBikesReducer,
    // singleBikeReducer : singleBikeReducer,
    singleViewBikeReducer : singleViewBikeReducer,
    rentRequestsReducer : rentRequestsReducer,
    // addLocationReducer : addLocationReducer,
    getLocationReducer : getLocationReducer,
    deleteLocationReducer : deleteLocationReducer,
    getCouponReducer : getCouponReducer

})


export default reducers