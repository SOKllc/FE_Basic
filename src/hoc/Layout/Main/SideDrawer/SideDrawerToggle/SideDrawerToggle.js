import React from "react";

import classes from "./SideDrawerToggle.module.css";

const sideDrawerToggle = (props) => {
  return (
    <div className={classes.SideDrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default sideDrawerToggle;
