import React, { useEffect, useState } from "react";

import "./Tabs.css";

import Aux from "../../hoc/Auxiliary/Auxiliary";

import Button from "../Button/Button";

const tabs = (props) => {
  const [tabID, setTabID] = useState(0);
  useEffect(() => {});
  const [tabContent, setTabContnet] = useState(null);
  useEffect(() => {});

  const tabHeaderClickHandler = (event) => {
    setTabID(event.target.id);
    setTabContnet(props.tabsData.tabsContent[event.target.id]);
  };

  if (props.tabsData) {
    let tabsHeaders = props.tabsData.tabsHeader.map((tabHeader, index) => {
      return (
        <Button
          btnType="Normal"
          key={index}
          id={index}
          clicked={(event) => tabHeaderClickHandler(event)}
        >
          {tabHeader}
        </Button>
      );
    });

    return (
      <Aux>
        <div className="Tabs">
          <div className="TabsHeaders">{tabsHeaders}</div>
          <div className="TabsContent">{tabContent}</div>
        </div>
      </Aux>
    );
  } else {
    return null;
  }
};
