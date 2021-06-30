import React from "react";

import classes from "./Modal.module.css";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  let className = classes.Modal;
  props.show
    ? (className = [className, classes.Show])
    : (className = [className, classes.Hide]);
  className = className.join(" ");
  
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.hideModal} />
      <div className={className}>{props.children}</div>
    </Aux>
  );
};

export default modal;
