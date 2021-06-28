import React, { Component } from "react";

import classes from "./Layout.module.css";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
class Layout extends Component {
  state = {
    sideDrawer: false,
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { sideDrawer: !prevState.sideDrawer };
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Header sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
        <Main
          sideDrawer={this.state.sideDrawer}
          backdropClick={this.backdropClickHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default Layout;
