import React from "react";

import classes from "./Logo.module.css";

import LogoIMG from "../../Assets/Images/Profile/Logo.png";

const logo = (prps) => {
  return (
    <div className={classes.Logo}>
      <img src={LogoIMG} alt="Logo" />
    </div>
  );
};

export default logo;
