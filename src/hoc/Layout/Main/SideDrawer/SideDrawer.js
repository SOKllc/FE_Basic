import React from "react";

import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let combineClass = [classes.SideDrawer];
  props.show
    ? (combineClass = [...combineClass, classes.Open].join(" "))
    : (combineClass = [...combineClass, classes.Close].join(" "));
  return <div className={combineClass}>Side Drawer</div>;
};

export default sideDrawer;
