import React from "react";

import Checkbox from "../../../Checkbox/Checkbox";
import Textbox from "../../../Textbox/TextBox";

const input = (props) => {
  let input = <p>Please set input type</p>;
  switch (props.inputType) {
    case "boolean":
      input = <Checkbox {...props} />;
      break;
    case "string":
      input = <Textbox {...props} />;
      break;
    case "number":
      input = <Textbox {...props} />;
      break;
    default:
      input;
      break;
  }
  return input;
};

export default input;
