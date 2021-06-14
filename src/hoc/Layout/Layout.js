import React, { Component } from "react";

import classes from "./Layout.module.css";

import Main from "./Main/Main";
class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Main />
      </div>
    );
  }
}

export default Layout;
