import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const getDashBoardDetailsReducer = (state = {} , {type,payload}) => {
    switch(type) {
        case AdminActionTypes.GET_DASHBOARD_DETAILS_REQ:
            return {
                loading : true
            }
        case AdminActionTypes.GET_DASHBOARD_DETAILS_SUCCESS:
            return{
                loading : false,
                dashBoardData : payload
            }  
        case AdminActionTypes.GET_DASHBOARD_DETAILS_FAILED:
            return{
                loading : false,
                dashBoardDataError : payload
            }      
        default : return state    
    }
}
