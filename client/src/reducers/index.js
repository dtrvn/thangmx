import { combineReducers } from "redux";
import alert from "./alert";
import alertShiftRegister from "./alertShiftRegister";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import user from "./user";
import job from "./job";
import branch from "./branch";
import shift from "./shift";
import typeUser from "./typeUser";
import personInShift from "./personInShift";
import shiftRegister from "./shiftRegister";
import nextWeekActive from "./nextWeekActive";

export default combineReducers({
  alert,
  alertShiftRegister,
  auth,
  profile,
  post,
  user,
  job,
  branch,
  shift,
  typeUser,
  personInShift,
  shiftRegister,
  nextWeekActive,
});
