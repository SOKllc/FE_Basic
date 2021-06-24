import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem Link="/" exact clicked={props.backdropClick}>Home</NavigationItem>
      <NavigationItem Link="/Preferance" clicked={props.backdropClick}>Preferance</NavigationItem>
    </ul>
  );
};

export default navigationItems;
