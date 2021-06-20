import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = (props) => {
  let Backdrop = props.show ? (
    <div className={classes.Backdrop} onClick={props.backdropClick}></div>
  ) : null;
  return Backdrop;
};

export default backdrop;
