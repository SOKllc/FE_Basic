import React, { Component } from "react";

import classes from "./Layout.module.css";

import Header from "./Header/Header";
import Main from "./Main/Main";
class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Header />
        <Main />
      </div>
    );
  }
}

export default Layout;
