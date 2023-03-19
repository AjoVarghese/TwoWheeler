import { applyMiddleware, createStore } from "redux";
import reducers from "./Reducers";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const initialstate = {
    userLoginReducer: { userLoginDetails: userInfo },
  };

const store = createStore(
    reducers,
    initialstate,
    composeWithDevTools(applyMiddleware(thunk))
    
)

export default store