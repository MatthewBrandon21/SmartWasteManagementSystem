import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import Login from "./Login";
import User from "./User";
import Trash from "./Trash";

export default combineReducers({ Login, ThemeReducer, User, Trash });
