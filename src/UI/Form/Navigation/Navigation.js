import React from "react";

import "./Navigation.css";

import Button from "../../Button/Button";
import Label from "../../Label/Label";

const navigation = (props) => {
  const moveFirst = (event) => {
    event.preventDefault();
    if (props.currentRecord === 0) return;
    props.onCurrentRecord(0);
  };

  const movePrevious = (event) => {
    event.preventDefault();
    if (props.currentRecord === 0) return;
    props.onCurrentRecord(props.currentRecord - 1);
  };

  const moveNext = (event) => {
    event.preventDefault();
    if (props.totalRecords === props.currentRecord + 1) return;
    props.onCurrentRecord(props.currentRecord + 1);
  };

  const moveLast = (event) => {
    event.preventDefault();
    if (props.totalRecords === props.currentRecord + 1) return;
    props.onCurrentRecord(props.totalRecords - 1);
  };

  const addNew = (event) => {
    event.preventDefault();
    props.onAddNew();
  };

  const addNewButton = (
    <Button btnType="Icon" clicked={addNew}>
      {"+"}
    </Button>
  );

  if (props.totalRecords > 1) {
    return (
      <nav className="Navigation">
        <Button btnType="Icon" clicked={moveFirst} isDisabled={props.addNew}>
          {"<<"}
        </Button>
        <Button btnType="Icon" clicked={movePrevious} isDisabled={props.addNew}>
          {"<"}
        </Button>
        <Label>{props.currentRecord + 1}</Label>/
        <Label>{props.totalRecords}</Label>
        <Button btnType="Icon" clicked={moveNext} isDisabled={props.addNew}>
          {">"}
        </Button>
        <Button btnType="Icon" clicked={moveLast} isDisabled={props.addNew}>
          {">>"}
        </Button>
        {props.hideModal ? null : addNewButton}
      </nav>
    );
  } else {
    return null;
  }
};

export default navigation;
