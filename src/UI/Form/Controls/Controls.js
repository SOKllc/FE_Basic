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

  const onDelete = () => {
    props.controlsAction("DELETE");
  };

  const onOK = () => {
    props.controlsAction("OK");
  };

  let isDisabled = props.inputsChanged ? false : true;

  const cancelButton = (
    <Button btnType="Normal" clicked={onCancel}>
      Cancel
    </Button>
  );

  const saveButton = (
    <Button btnType="Normal" clicked={onSave} isDisabled={isDisabled}>
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

  const deleteButton = (
    <Button btnType="Normal" clicked={onDelete}>
      Delete
    </Button>
  );

  const OKButton = (
    <Button btnType="Normal" clicked={onOK}>
      OK
    </Button>
  );

  if (props.hideModal) {
    return (
      <div className="Controls">
        {props.addNew || props.inputsChanged ? null : closeButton}
        {props.addNew || props.inputsChanged || props.formType === "InputForm"
          ? null
          : addNewButton}
        {props.addNew || props.inputsChanged || props.formType === "InputForm"
          ? props.emptyData
            ? null
            : cancelButton
          : null}
        {props.formType === "InputForm" ? null : saveButton}
        {props.formType === "InputForm" ? OKButton : null}
        {props.addNew || props.inputsChanged || props.formType === "InputForm"
          ? null
          : deleteButton}
      </div>
    );
  } else {
    return (
      <div className="Controls">
        {props.addNew || props.inputsChanged || props.formType === "InputForm"
          ? null
          : addNewButton}
        {props.addNew || props.inputsChanged || props.formType === "InputForm"
          ? props.emptyData
            ? null
            : cancelButton
          : null}
        {props.formType === "InputForm" ? null : saveButton}
        {props.formType === "InputForm" ? OKButton : null}
        {props.addNew || props.inputsChanged || props.formType === "InputForm"
          ? null
          : deleteButton}
      </div>
    );
  }
};

export default controls;
