import React from "react";

import Input from "./Input/Input";

const inputs = (props) => {
  let inputs = props.formTable.Columns;
  return inputs.map((input) => {
    return (
      <Input
        key={input.Name}
        id={props.parentID + "-" + input.Name}
        inputType={input.Config.inputType}
        isPassword={input.Config.isPassword}
        isDisabled={input.Config.isDisabled}
        inputLabel={input.Name}
        onInputChange={props.onInputChange}
      />
    );
  });
};

export default inputs;
