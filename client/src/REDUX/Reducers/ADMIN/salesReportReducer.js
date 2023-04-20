import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const salesReportReducer = (state = {} , {type,payload}) => {
    switch(type){
        case AdminActionTypes.GET_SALES_REPORT_REQ:
            return{
                loading : true
            }
        case AdminActionTypes.GET_SALES_REPORT_SUCCESS:
            return{
                loading : false,
                salesReportData : payload
            }  
        case AdminActionTypes.GET_SALES_REPORT_FAILED:
            return{
                loading : false,
                salesReportDataError : payload
            }      
        default : return state    
    }
}