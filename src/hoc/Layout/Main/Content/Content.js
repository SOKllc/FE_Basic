import React, { Component } from "react";

import Content from "../../../../Components/MyComponents/Content/Content";

import Routes from "../../../../UI/Routes/Routes";

const content = (props) => {
  return (
    <Content {...props}>
      <Routes />
    </Content>
  );
};

export default content;
