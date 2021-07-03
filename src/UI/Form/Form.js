import React, { Component } from "react";

import "./Form.css";

import Header from "../../Components/MyComponents/Header/Header";
import Content from "../../Components/MyComponents/Content/Content";
import Footer from "../../Components/MyComponents/Footer/Footer";
import Navigation from "./Navigation/Navigation";
import Input from "./Input/Input";
import Inputs from "./Inputs/Inputs";
class Form extends Component {
  state = {
    formDataStatus: this.props.recordsets ? true : false,
    formTitle: this.props.title,
    formTotalRecords: this.props.recordsets ? this.props.recordsets.length : 0,
    formCurrentRecord: this.props.currentRecord ? this.props.currentRecord : 0,
    formRecordsets: this.props.recordsets ? this.props.recordsets : null,
    formRecordset: this.props.recordsets
      ? this.props.recordsets[
          this.props.currentRecord ? this.props.currentRecord : 0
        ]
      : null,
  };

  componentDidMount = () => {
    if (this.state.formDataStatus) {
      this.setInputsValues(this.state.formRecordset);
    }
  };

  setInputsValues = (recordset) => {
    if (this.state.formDataStatus) {
      let inputsID = Object.keys(recordset);
      Array.from(inputsID).forEach((inputID) => {
        let inputValue = recordset[inputID];
        let input = document.getElementById(inputID);
        input.type === "checkbox"
          ? (input.checked = inputValue ? true : false)
          : (input.value = inputValue);
      });
    }
  };

  onCurrentRecord = (currentRecord) => {
    if (this.state.formDataStatus) {
      let recordset = this.state.formRecordsets[currentRecord];
      this.setInputsValues(recordset);
      this.setState({
        formCurrentRecord: currentRecord,
        formRecordset: recordset,
      });
    }
  };

  render() {
    return (
      <form>
        <Header>{this.state.formTitle}</Header>
        <Content className="Content">
          <Navigation
            totalRecords={this.state.formTotalRecords}
            currentRecord={this.state.formCurrentRecord}
            onCurrentRecord={(currentRecord) =>
              this.onCurrentRecord(currentRecord)
            }
          />
          <br />
          <Inputs recordset={this.state.formRecordset} />
        </Content>
        <Footer>Form Footer</Footer>
      </form>
    );
  }
}

export default Form;
