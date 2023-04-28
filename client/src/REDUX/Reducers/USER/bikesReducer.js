import { AdminActionTypes } from '../../Constants/Admin/AdminActionTypes'
import { ActionTypes } from '../../Constants/User/ActionTypes'

export const bikesReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_BIKES_REQ:
      return {
        loading: true
      }

    case ActionTypes.GET_BIKES_SUCCESS:
      return {
        loading: false,
        bikesData: payload
      }

    case ActionTypes.GET_BIKES_FAILED:
      return {
        loading: false,
        bikesDataError: payload
      }

    case ActionTypes.GET_HOME_BIKES_REQ:
      return {
        loading : true
      }

    case ActionTypes.GET_HOME_BIKES_SUCCESS:
      return {
        loading : false,
        homeBikesData : payload
      }  

    case ActionTypes.GET_HOME_BIKES_FAILED:
      return {
        loading : false,
        homeBikesDataError : payload
      }  

    case ActionTypes.GET_SEARCHED_BIKES_REQ:
      return {
        loading: true
      }

    case ActionTypes.GET_SEARCHED_BIKES_SUCCESS:
      return {
        loading: false,
        bikesData: payload
      }

    case ActionTypes.GET_SEARCHED_BIKES_FAILED:
      return {
        loading: false,
        bikesDataError: payload
      }
    case ActionTypes.FILTER_REQ:
      return {
        loading: true
      }
    case ActionTypes.FILTER_REQ_SUCCESS:
      return {
        loading: false,
        bikesData: payload
      }
    case ActionTypes.FILTER_REQ_FAILED:
      return {
        loading: false,
        bikesDataError: payload
      }

    default:
      return state
  }
}
