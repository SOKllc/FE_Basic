import React from "react";

const label = (props) => {
  return <label {...props}>{props.children}</label>;
};

export default label;
