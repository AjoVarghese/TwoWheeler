import { AdminActionTypes } from "../../Constants/Admin/AdminActionTypes";

export const getLocationReducer = (state = {}, { type, payload }) => {
 
  switch (type) {
    case AdminActionTypes.GET_LOCATION_SUCCESS:
      return {
        location: payload,
      };

    case AdminActionTypes.GET_LOCATION_FAILED:
      return {
        locationError: payload,
      };

    default:
      return state;
  }
};

export const deleteLocationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case AdminActionTypes.DELETE_LOC_REQ:
      return {
        loading: true,
      };

    case AdminActionTypes.DELETE_LOC_SUCCESS:
      return {
        loading: false,
        location: payload,
      };

    case AdminActionTypes.DELETE_LOC_FAILED:
      return {
        loading: false,
        locationError: payload,
      };
    default:
      return state;
  }
};

export const editLocationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case AdminActionTypes.EDIT_LOC_REQ:
      return {
        loading: true,
      };
    case AdminActionTypes.EDIT_LOC_SUCCESS:
      return {
        loading: false,
        location: payload,
      };
    case AdminActionTypes.EDIT_LOC_FAILED:
      return {
        loading: false,
        locationError: payload,
      };

    default:
      return state;
  }
};
