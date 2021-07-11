import React from "react";

import Input from "./Input/Input";

const inputs = (props) => {
  let recordset = props.recordset;
  if (recordset) {
    return Object.keys(recordset).map((inputKey) => {
      return (
        <Input
          key={inputKey}
          id={props.parentID + "-" + inputKey}
          inputType={typeof recordset[inputKey]}
          inputLabel={inputKey}
          onInputChange={props.onInputChange}
        />
      );
    });
  } else {
    return null;
  }
};

export default inputs;
