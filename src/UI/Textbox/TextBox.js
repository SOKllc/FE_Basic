import React from "react";

import Label from "../Label/Label";

const textbox = (props) => {
  return (
    <div className='TextBox'>
      <Label>{props.inputLabel}</Label>
      <input type="text" id={props.id} defaultValue={props.inputValue} />
    </div>
  );
};

export default textbox;
