import React from "react";

import classes from "./NavigationItems.module.css";

import HomeIMG from "../../../Assets/Images/Profile/Home.png";
import PreferanceIMG from "../../../Assets/Images/Profile/Preferance.png";

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
      <NavigationItem
        Link="/Preferances"
        clicked={props.backdropClick}
        IMG={PreferanceIMG}
      >
        Preferance
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
