import React from "react";

import classes from "./SideDrawer.module.css";

import Aux from "../../../Auxiliary/Auxiliary";
import Backdrop from "../../../../UI/Backdrop/Backdrop";
import NavigationItems from "../../../../Components/Navigations/NavigationItems/NavigationItems";

const sideDrawer = (props) => {
  let combineClass = classes.SideDrawer;
  props.show
    ? (combineClass = [combineClass, classes.Show].join(" "))
    : (combineClass = [combineClass, classes.Hide].join(" "));
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.backdropClick} />
      <div className={combineClass}>
        <div className={classes.Header}>Header</div>
        <nav className={classes.Navigation}>
          <NavigationItems backdropClick={props.backdropClick}/>
        </nav>
        <div className={classes.Footer}>Footer</div>
      </div>
    </Aux>
  );
};

export default sideDrawer;
