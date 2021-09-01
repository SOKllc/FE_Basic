const emptyTable = {
    formName: {
      Name: "formName",
      Columns: [
        {
          Name: "",
          Sort: "",
          Config: {
            inputType: "",
            defaultValue: "",
            isID: false,
            isRowGuidCol: false,
            isPassword: false,
            isDisabled: false,
            isHTTPInput: false,
            isSelect: false,
          },
          Validation: {},
        },
      ],
    },
  };
  
  const builtinTables = {
    Login: {
      Name: "Login",
      Columns: [
        {
          Name: "Name",
          Sort: 1,
          Config: {
            inputType: "text",
            defaultValue: "",
            isID: false,
            isRowGuidCol: false,
            isPassword: false,
            isDisabled: false,
            isHTTPInput: true,
            isSelect: false,
          },
          Validation: {},
        },
        {
          Name: "Password",
          Sort: 2,
          Config: {
            inputType: "text",
            defaultValue: "",
            isID: false,
            isRowGuidCol: false,
            isPassword: true,
            isDisabled: false,
            isHTTPInput: true,
            isSelect: false,
          },
          Validation: {},
        },
      ],
    },
  };
  
  export default builtinTables;
  