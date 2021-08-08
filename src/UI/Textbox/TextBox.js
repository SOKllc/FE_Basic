import React from "react";

import "./Textbox.css";

import Label from "../Label/Label";

const textbox = (props) => {
  return (
    <div className="Textbox">
      <Label noLabel={props.noLabel}>{props.inputLabel}</Label>
      <input
        type={props.isPassword ? "password" : props.inputType}
        disabled={props.isDisabled}
        id={props.id}
        name={props.inputLabel}
        onChange={props.onInputChange}
      />
    </div>
  );
};

export default textbox;
