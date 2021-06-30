import React from "react";

import "./Header.css";

const header = (props) => {
  return <header {...props}>{props.children}</header>
}

export default header;
