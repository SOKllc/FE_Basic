import React from "react";

import "./Alert.css";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../Backdrop/Backdrop";
import Button from "../../Button/Button";

const alert = (props) => {
  let className = "Alert";
  props.show
    ? (className = className + " Show")
    : (className = className + " Hide");

  const onYes = () => {
    props.alertAction("YES");
  };

  const onNo = () => {
    props.alertAction("NO");
  };

  const onCancel = () => {
    props.alertAction("CANCEL");
  };

  if (props.formAlert) {
    return (
      <Aux>
        <Backdrop show={props.show} Alert />
        <div className={className}>
          <h4>Caution Alert...</h4>
          <h5>{props.formAlert.massage}</h5>
          <div>
            <Button btnType="Normal" clicked={onCancel}>
              Cancel
            </Button>
            <Button btnType="Normal" clicked={onYes}>
              Yes
            </Button>
            <Button btnType="Normal" clicked={onNo}>
              No
            </Button>
          </div>
        </div>
      </Aux>
    );
  } else {
    return null;
  }
};

export default alert;
