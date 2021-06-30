import React from "react";

import classes from "./Header.module.css";

import Header from "../../../Components/MyComponents/Header/Header";

import SideDrawerToggle from "../Main/SideDrawer/SideDrawerToggle/SideDrawerToggle";
import Logo from "../../../Components/Logo/Logo";
import NavigationItems from "../../../Components/Navigations/NavigationItems/NavigationItems";

const header = (props) => {
  return (
    <Header>
      <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
      <Logo />
      <nav className={classes.Navigation}>
        <NavigationItems />
      </nav>
    </Header>
  );
};

export default header;
