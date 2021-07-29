import React from "react";

import Input from "./Input/Input";

const inputs = (props) => {
  let inputs = props.formSchema.columns;
  return inputs.map((input) => {
    return (
      <Input
        key={input.columnName}
        id={props.parentID + "-" + input.columnName}
        inputType={input.config.type}
        disabled={input.config.disabled}
        inputLabel={input.columnName}
        onInputChange={props.onInputChange}
      />
    );
  });
};

export default inputs;
