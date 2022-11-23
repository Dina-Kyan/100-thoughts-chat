
import { combineReducers } from "redux";
import isLogged from './isLogged'
import userReducer from "./userReducer";
import modalMessage from "./modalMessage";

const allReducers = combineReducers({
    isLogged,
    userReducer,
    modalMessage,
})

export default allReducers;