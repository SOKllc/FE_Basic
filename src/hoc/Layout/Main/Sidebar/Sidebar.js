import React from "react";

import classes from "./Sidebar.module.css";

import Header from "../../../../Components/MyComponents/Header/Header";
import Content from "../../../../Components/MyComponents/Content/Content";
import Footer from "../../../../Components/MyComponents/Footer/Footer";

const sidebar = (props) => {
  return props.show ? (
    <div className={classes.Sidebar}>
      <Header>Header</Header>
      <Content>Sidebar</Content>
      <Footer>Footer</Footer>
    </div>
  ) : null;
};

export default sidebar;
