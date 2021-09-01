import * as actionsTypes from "../../Actions/Actions";

import builtinTables from "./BuiltinTables";

const initialState = {
  BuiltInTables: { ...builtinTables },
  CurrentDatabase: {},
};

const setDatabases = (state, action) => {
  let actionData = action.data;
  return {
    ...state,
    ServerDatabases: { ...actionData },
  };
};

const setCurrentDatabase = (state, action) => {
  let actionData = action.data;
  return {
    ...state,
    CurrentDatabase: { ...state.CurrentDatabase, ...actionData },
  };
};

const setCurrentDatabaseINFO = (state, action) => {
  let actionData = action.data;
  return {
    ...state,
    CurrentDatabase: { ...state.CurrentDatabase, ...actionData },
  };
};

const clearDatabases = () => {
  return { ...initialState };
};

const reducer = (state = initialState, action) => {
  let actionType = action.type;
  switch (actionType) {
    case actionsTypes.SET_DATABASES:
      return setDatabases(state, action);
    case actionsTypes.SET_CURRENT_DATABASE:
      return setCurrentDatabase(state, action);
    case actionsTypes.SET_CURRENT_DATABASE_INFO:
      return setCurrentDatabaseINFO(state, action);
    case actionsTypes.CLEAR_DATABASES:
      return clearDatabases();
    default:
      return { ...state };
  }
};

export default reducer;
