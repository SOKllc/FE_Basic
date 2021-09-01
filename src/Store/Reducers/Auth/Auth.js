import * as actionsTypes from "../../Actions/Actions";

const initialState = {
  isAuthenticated: false,
  User: {
    Priviliges: {
      isAdmin: false,
    },
    Preferances: {
      BackgroundColor: "Black",
      ForeColor: "White",
      ShowLeftSidebar: false,
      ShowRightSidebar: false,
    },
  },
};

const authSuccess = (state, action) => {
  let actionData = action.data;
  return {
    ...state,
    isAuthenticated: true,
    User: { ...actionData },
  };
};

const authFailed = (state, action) => {
  return { ...initialState };
};

const authClear = (state, action) => {
  return { ...initialState };
};

const reducer = (state = initialState, action) => {
  let actionType = action.type;
  switch (actionType) {
    case actionsTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionsTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionsTypes.AUTH_CLEAR:
      return authClear(state, action);
    default:
      return { ...state };
  }
};

export default reducer;
