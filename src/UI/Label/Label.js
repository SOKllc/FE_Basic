import React from "react";

const label = (props) => {
  return props.noLabel ? null : <label>{props.children}</label>;
};

export default label;
