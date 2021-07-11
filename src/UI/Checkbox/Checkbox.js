import React from "react";

import "./Checkbox.css";

import Label from "../Label/Label";

const checkbox = (props) => {
  return (
    <div className="Checkbox">
      <Label>{props.inputLabel}</Label>
      <input
        type="checkbox"
        id={props.id}
        name={props.inputLabel}
        onChange={props.onInputChange}
      />
    </div>
  );
};

export default checkbox;
