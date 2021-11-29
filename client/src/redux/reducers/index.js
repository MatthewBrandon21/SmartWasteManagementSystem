import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import postReducer from "./Post";

const Reducers = combineReducers({ ThemeReducer, postReducer });

export default Reducers;
