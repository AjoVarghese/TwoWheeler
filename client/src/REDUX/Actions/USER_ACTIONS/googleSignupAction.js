import { ActionTypes } from "../../Constants/User/ActionTypes";

export const googleSignupAction = (data) => async (dispatch) => {
  console.log(data?.Name);
  try {
    dispatch({
      type: ActionTypes.GOOGLE_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GOOGLE_SIGNUP_FAILED,
      payload: error.response,
    });
  }
};
