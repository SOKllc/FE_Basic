import React from "react";

import classes from "./Logo.module.css";

import defaultLogo from "../../Assets/Images/Profile/Default.png";

const logo = (prps) => {
  return (
    <div className={classes.Logo}>
      <img src={defaultLogo} ></img>
    </div>
  );
};

export default logo;
