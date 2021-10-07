import { combineReducers } from "redux";
import monsterCardReducer from "./monsterCardReducer";
import spellCardReducer from "./spellCardReducer";
import trapCardReducer from "./trapCardReducer";
import signupUserReducer from "./signupUser";
import loginUserReducer from "./loginUser";

const reducers = combineReducers({
  monsterCard: monsterCardReducer,
  spellCard: spellCardReducer,
  trapCard: trapCardReducer,
  signupUser: signupUserReducer,
  loginUser: loginUserReducer,
});

export default reducers;
