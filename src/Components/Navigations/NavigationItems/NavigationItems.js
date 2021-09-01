import React from "react";
import { connect } from "react-redux";

import classes from "./NavigationItems.module.css";

import HomeIMG from "../../../Assets/Images/Profile/Home.png";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        Link="/"
        exact
        clicked={props.backdropClick}
        IMG={HomeIMG}
      >
        Home
      </NavigationItem>
      {!props.isAuthenticated ? null : <Aux></Aux>}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
