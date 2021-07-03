import React from "react";

import classes from "./Navigation.module.css";

import Button from "../../Button/Button";
import Label from "../../Label/Label";

const navigation = (props) => {
  const moveFirst = (event) => {
    event.preventDefault();
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
    props.onCurrentRecord(props.totalRecords - 1);
  };

  return (
    <nav className={classes.Navigation}>
      <Button btntype="Icon" clicked={moveFirst}>
        {"<<"}
      </Button>
      <Button btntype="Icon" clicked={movePrevious}>
        {"<"}
      </Button>
      <Label>{props.currentRecord + 1}</Label>/
      <Label>{props.totalRecords}</Label>
      <Button btntype="Icon" clicked={moveNext}>
        {">"}
      </Button>
      <Button btntype="Icon" clicked={moveLast}>
        {">>"}
      </Button>
    </nav>
  );
};

export default navigation;
