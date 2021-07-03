import React from "react";

import Label from "../Label/Label";

const checkbox = (props) => {
  return (
    <div className="Checkbox">
      <Label>{props.inputLabel}</Label>
      <input type="checkbox" id={props.id} defaultChecked={props.inputValue} />
    </div>
  );
};

export default checkbox;
