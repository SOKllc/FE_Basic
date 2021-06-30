import React from "react";

import "./Footer.css";

const footer = (props) => {
  return <footer {...props}>{props.children}</footer>;
};

export default footer;
