import * as actionsTypes from "../../Actions/Actions";

const initialState = {};

// 0: {
//   columnName: 'Name',
//   columnDataType: {
//     type: 'input',
//     config: {
//       type: 'text',
//       placeholder: 'User Name',
//       style: {
//         display: 'flex',
//       },
//     },
//     validation: {
//       isRequired: true,
//     },
//   },
// },

const reducer = (state = initialState, action) => {
  let actionType = action.type;
  let actionData = action.data
  switch (actionType) {
    case actionsTypes.SET_SCHEMA:
      return { ...state, ...actionData  };
    default:
      return { ...state };
  }
};

export default reducer;
