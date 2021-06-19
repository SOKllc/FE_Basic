import React from "react";

import classes from "./Header.module.css";

import SideDrawerToggle from "../Main/SideDrawer/SideDrawerToggle/SideDrawerToggle";
import Logo from "../../../Components/Logo/Logo";
import NavigationItems from "../../../Components/Navigations/NavigationItems/NavigationItems";

const header = (props) => {
  return (
    <div className={classes.Header}>
      <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
      <Logo />
      <NavigationItems />
    </div>
  );
};

export default header;
