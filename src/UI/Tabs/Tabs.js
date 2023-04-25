import React, { Component, useEffect, useState } from "react";

import "./Tabs.css";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import AsyncComponent from "../../hoc/AsyncComponent/AsyncComponent";

import Form from "../Form/Form";
import * as Types from "../Form/Types";
import Button from "../Button/Button";

class Tabs extends Component {
  state = {
    tabID: 0,
    DataStatus: false,
  };

  componentDidMount = () => {
    if (!this.props.relatedData) {
      return;
    } else {
      let relatedData = this.props.relatedData;
      let tabsHeader = [];
      let tabsHeaderName = Object.keys(relatedData).map((tabName, index) => {
        let tabHeaderButton = (
          <Button
            key={index}
            id={index}
            btnType="Normal"
            clicked={(event) => this.tabHeaderClick(event)}
          >
            {tabName}
          </Button>
        );
        tabsHeader.push(tabHeaderButton);
        return tabName;
      });
      this.setState(
        { tabsHeaderName: tabsHeaderName, tabsHeader: tabsHeader },
        () => {
          let tabName = this.state.tabsHeaderName[this.state.tabID];
          let recordsets = relatedData[tabName];
          console.log(recordsets);
          this.setState({
            Name: tabName,
            recordsets: recordsets,
            DataStatus: true,
          });
        }
      );
    }
  };

  tabHeaderClick = (event) => {
    let relatedData = this.props.relatedData;
    let tabName = this.state.tabsHeaderName[Number(event.target.id)];
    let recordsets = relatedData[tabName];
    this.setState({
      tabID: event.target.id,
      Name: tabName,
      recordsets: recordsets,
    });
  };

  render() {
    if (!this.state.DataStatus) {
      return null;
    } else {
      return (
        <Aux>
          <div className="Tabs">
            <div className="TabsHeaders">{this.state.tabsHeader}</div>
            <Form
              Type={Types.SUB_FORM}
              Name={this.state.Name}
              recordsets={this.state.recordsets}
            />
          </div>
        </Aux>
      );
    }
  }
}

export default Tabs;
