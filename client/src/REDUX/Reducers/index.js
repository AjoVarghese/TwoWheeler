import { combineReducers } from "redux";
import { adminBikesReducer } from "./ADMIN/adminBIkesReducer";
import { getAllBikesReducer } from "./ADMIN/adminGetAllBikesReducer";
import { adminLoginReducer } from "./ADMIN/adminLoginReducer";
import { adminUserGetReducer } from "./ADMIN/adminUserReducer";
import { bikesReducer } from "./USER/bikesReducer";
import { imageUploadReducer } from "./USER/imageUploadReducer";
import { userGetProfileReduer } from "./USER/userGetProfileReducer";
import { userHomeReducer } from "./USER/userHomeReducer";
import { userLoginReducer } from "./USER/userLoginReducer";
import { userRegisterReducer } from "./USER/userReducer";

const reducers = combineReducers({
    userRegisterReducer : userRegisterReducer,
    userLoginReducer : userLoginReducer,
    userHomeReducer : userHomeReducer,
    userGetProfileReduer : userGetProfileReduer,
    imageUploadReducer : imageUploadReducer,
    bikesReducer : bikesReducer,


    adminLoginReducer : adminLoginReducer,
    adminUserGetReducer : adminUserGetReducer,
    adminBikesReducer : adminBikesReducer,
    admingetAllBikesReducer :getAllBikesReducer
})


export default reducers