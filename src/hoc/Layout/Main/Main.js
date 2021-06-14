import React from "react";

import classes from "./Main.module.css";

import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";

const main = (props) => {
  return (
    <div className={classes.Main}>
      <Sidebar />
      <Content />
      <Sidebar />
    </div>
  );
};

export default main;
