import { OTPLoginApi, userLoginAPi } from "../../../api/User/ApiCalls";
import { ActionTypes } from "../../Constants/User/ActionTypes";

export const userLoginAction = (Mobile, Password) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST,
    });

    userLoginAPi(Mobile, Password)
      .then((data) => {
        dispatch({
          type: ActionTypes.LOGIN_REQUEST_SUCCESS,
          payload: data.data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      })

      .catch((error) => {
        dispatch({
          type: ActionTypes.LOGIN_REQUEST_FAILED,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      });
  } catch (error) {}
};

export const otpLoginAction = (mobile) => async (dispatch) => {
  dispatch({
    type: ActionTypes.LOGIN_REQUEST,
  });

  OTPLoginApi(mobile)
    .then((data) => {
      dispatch({
        type: ActionTypes.LOGIN_REQUEST_SUCCESS,
        payload: data.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.LOGIN_REQUEST_FAILED,
        payload: err.response,
      });
    });
};
