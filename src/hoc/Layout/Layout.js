import React, { Component } from "react";

import classes from "./Layout.module.css";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: flase });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Header sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
        <Main showSideDrawer={this.state.showSideDrawer} />
        <Footer />
      </div>
    );
  }
}

export default Layout;
