import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact={props.exact}
        className={classes.NavigationLink}
        to={props.Link}
        onClick={props.clicked}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
