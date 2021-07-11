import React from "react";

import "./Textbox.css";

import Label from "../Label/Label";

const textbox = (props) => {
  return (
    <div className="Textbox">
      <Label>{props.inputLabel}</Label>
      <input
        type="text"
        id={props.id}
        name={props.inputLabel}
        onChange={props.onInputChange}
      />
    </div>
  );
};

export default textbox;
