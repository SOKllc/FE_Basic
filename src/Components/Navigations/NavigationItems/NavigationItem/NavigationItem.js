import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  let children = props.children;
  !props.IMG ? children : (children = <img src={props.IMG} alt={children} />);
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact={props.exact}
        className={classes.NavigationLink}
        to={props.Link}
        onClick={props.clicked}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
