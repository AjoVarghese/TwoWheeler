import { getSalesReportApi } from "../../../api/Admin/ApiCalls"
import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const salesReportAction = () => async(dispatch) => {
    dispatch({ 
       type : AdminActionTypes.GET_SALES_REPORT_REQ
    })

    getSalesReportApi().then((data) => {
        console.log('salesAPI',data.data);
        dispatch({
            type : AdminActionTypes.GET_SALES_REPORT_SUCCESS,
            payload : data.data
        })
    })

    .catch((err) => {
        console.log('Sales api error',err);
        dispatch({
            type : AdminActionTypes.GET_SALES_REPORT_FAILED,
            payload : err.response
        })
    })
}