import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import User from "./User";
import Trash from "./Trash";

export default combineReducers({ ThemeReducer, User, Trash });
