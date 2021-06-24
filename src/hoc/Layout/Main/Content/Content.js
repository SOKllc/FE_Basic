import React, { Component } from "react";

import classes from "./Content.module.css";

import Routes from "../../../../UI/Routes/Routes";

const content = (props) => {
  return (
    <div className={classes.Content}>
      <Routes />
    </div>
  );
};

export default content;
