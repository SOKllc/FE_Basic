import React from "react";

import "./Button.css";

const button = (props) => {
  let className = "";
  switch (props.btnType) {
    case "Icon":
      className = "Icon";
      break;
    case "Normal":
      className = "Normal";
      break;
    default:
      className;
      break;
  }

  props.disabled ? (className = className + " disabled") : className;

  return (
    <button
      className={className}
      onClick={props.clicked}
      disabled={props.disabled}
      hidden={props.hidden}
    >
      {props.children}
    </button>
  );
};

export default button;
