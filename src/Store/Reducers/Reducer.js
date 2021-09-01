import { combineReducers } from "redux";

import errorReducer from "./Error/Error";
import authReducer from "./Auth/Auth";
import databasesReducer from "./Databases/Databases";

const reducer = combineReducers({
  Error: errorReducer,
  Auth: authReducer,
  Databases: databasesReducer,
});

export default reducer;
