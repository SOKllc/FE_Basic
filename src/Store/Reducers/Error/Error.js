import * as actionsTypes from "../../Actions/Actions";

const initialState = {
  Status: false,
};

const errorOccur = (state, action) => {
  let actionData = action.data;
  return { ...actionData };
};

const errorClear = () => {
  return { ...initialState };
};

const reducer = (state = initialState, action) => {
  let actionType = action.type;
  switch (actionType) {
    case actionsTypes.ERROR_OCCUR:
      return errorOccur(state, action);
    case actionsTypes.ERROR_CLEAR:
      return errorClear(state, action);
    default:
      return { ...state };
  }
};

export default reducer;
