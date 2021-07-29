import React from "react";

import Checkbox from "../../../Checkbox/Checkbox";
import Textbox from "../../../Textbox/TextBox";

const input = (props) => {
  let input = <p>Please set input type</p>;
  switch (props.inputType) {
    case "text":
      input = <Textbox {...props} />;
      break;
    case "checkbox":
      input = <Checkbox {...props} />;
      break;
    case "hidden":
      input = <Textbox {...props} noLabel />;
      break;
    case "number":
      input = <Textbox {...props} />;
      break;
    case "file":
      input = <Textbox {...props} />;
    default:
      input;
      break;
  }
  return input;
};

export default input;
