import React from "react";

import classes from "./Main.module.css";

import SideDrawer from "./SideDrawer/SideDrawer";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";

const main = (props) => {
  return (
    <div className={classes.Main}>
      <SideDrawer show={props.sideDrawer} backdropClick={props.backdropClick} />
      <Sidebar />
      <Content />
      <Sidebar />
    </div>
  );
};

export default main;
