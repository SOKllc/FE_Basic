import { combineReducers } from "redux";

import schemaReducer from "./Schema/Schema";

const reducer = combineReducers({
  Schema: schemaReducer,
});

export default reducer;
