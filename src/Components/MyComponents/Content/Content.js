import React from "react";

import classes from "./Content.module.css";

const content = (props) => {
  let className = [props.className, classes.Content].join(" ");
  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  );
};

export default content;
