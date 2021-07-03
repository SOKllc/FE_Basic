import React from "react";

import "./Button.css";

const button = (props) => {
  let className = "";
  switch (props.btntype) {
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

  return (
    <button
      className={className}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
