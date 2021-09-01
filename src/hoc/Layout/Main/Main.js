import React from "react";
import { connect } from "react-redux";

import classes from "./Main.module.css";

import SideDrawer from "./SideDrawer/SideDrawer";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";

const main = (props) => {
  return (
    <div className={classes.Main}>
      <SideDrawer show={props.sideDrawer} backdropClick={props.backdropClick} />
      <Sidebar show={props.showLeftSidebar} />
      <Content />
      <Sidebar show={props.showRightSidebar} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showLeftSidebar: state.Auth.User.Preferances.ShowLeftSidebar,
    showRightSidebar: state.Auth.User.Preferances.ShowRightSidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(main);
