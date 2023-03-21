import { applyMiddleware, createStore } from "redux";
import reducers from "./Reducers";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const adminInfo = JSON.parse(localStorage.getItem("adminInfo"))

const initialstate = {
    userLoginReducer: { userLoginDetails: userInfo },
    adminLoginReducer : {adminLoginData : adminInfo}
  };

const store = createStore(
    reducers,
    initialstate,
    composeWithDevTools(applyMiddleware(thunk))
    
)

export default store