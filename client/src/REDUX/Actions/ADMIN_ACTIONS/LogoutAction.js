import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes"

export const adminLogoutAction = () => async(dispatch) => {
    try {
        localStorage.removeItem('adminInfo')
        dispatch({
            type : AdminActionTypes.LOGOUT_REQ
        })
    } catch (error) {
        
    }
   
}