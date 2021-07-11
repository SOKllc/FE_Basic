import React from "react";

import "./Controls.css";

import Button from "../../Button/Button";

const controls = (props) => {
  const onCancel = () => {
    props.controlsAction("CANCEL");
  };

  const onSave = () => {
    props.controlsAction("SAVE");
  };

  const onAddNew = () => {
    props.controlsAction("ADD_NEW");
  };

  const onClose = () => {
    props.controlsAction("CLOSE");
  };

  let disabled = props.inputsChanged ? false : true;

  const cancelButton = (
    <Button btnType="Normal" clicked={onCancel}>
      Cancel
    </Button>
  );

  const saveButton = (
    <Button btnType="Normal" clicked={onSave} disabled={disabled}>
      Save
    </Button>
  );

  const addNewButton = (
    <Button btnType="Normal" clicked={onAddNew}>
      Add New
    </Button>
  );

  const closeButton = (
    <Button btnType="Normal" clicked={onClose}>
      Close
    </Button>
  );

  if (props.hideModal) {
    return (
      <div className="Controls">
        {props.inputsChanged ? null : closeButton}
        {props.addNew || props.inputsChanged ? null : addNewButton}
        {props.addNew || props.inputsChanged ? cancelButton : null}
        {saveButton}
      </div>
    );
  } else {
    return (
      <div className="Controls">
        {props.addNew || props.inputsChanged ? null : addNewButton}
        {props.addNew || props.inputsChanged ? cancelButton : null}
        {saveButton}
      </div>
    );
  }
};

export default controls;
