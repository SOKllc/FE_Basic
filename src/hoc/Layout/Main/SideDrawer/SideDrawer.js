import React from "react";

import classes from "./SideDrawer.module.css";

import Header from "../../../../Components/MyComponents/Header/Header";
import Content from "../../../../Components/MyComponents/Content/Content";
import Footer from "../../../../Components/MyComponents/Footer/Footer";

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
        <Header className={classes.Header}>Header</Header>
        <Content>
          <nav className={classes.Navigation}>
            <NavigationItems backdropClick={props.backdropClick} />
          </nav>
        </Content>
        <Footer className={classes.Footer}>Footer</Footer>
      </div>
    </Aux>
  );
};

export default sideDrawer;
