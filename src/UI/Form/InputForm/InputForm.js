import React, { Component } from "react";
import { connect } from "react-redux";

import "./InputForm.css";

import Header from "../../../Components/MyComponents/Header/Header";
import Content from "../../../Components/MyComponents/Content/Content";
import Footer from "../../../Components/MyComponents/Footer/Footer";
import Inputs from "../Inputs/Inputs";
import Controls from "../Controls/Controls";

class InputForm extends Component {
  state = {
    formType: "InputForm",
    formName: this.props.formName,
    formSchema: this.props.BuiltInTables[this.props.formName],
    formTitle: this.props.formName,
    formID: this.props.formID
      ? this.props.formName + this.props.formID
      : this.props.formName,
    formInputsChanged: false,
  };

  componentDidMount = () => {};

  getInputsValues = (method) => {
    let formID = this.state.formID;
    let inputs = document.getElementById(formID).getElementsByTagName("input");
    let inputsValues = {};
    let httpInputs = this.state.formSchema.Columns.filter((column) => {
      return column.Config.isHTTPInput;
    }).reduce((acc, cur) => (acc = [...acc, cur.Name]), []);
    Array.from(inputs).forEach((input) => {
      let inputName = input.name;
      let inputValue = input.value;
      let inputType = input.type;
      let httpInput = httpInputs.includes(inputName);
      if (method === "httpData" && !httpInput) {
        inputsValues = { ...inputsValues };
      } else {
        switch (inputType) {
          case "checkbox":
            inputValue = input.checked ? true : false;
            break;
          case "number":
            inputValue = Number(input.value);
            break;
          case "text":
            inputValue = input.value.trim();
            break;
          case "password":
            inputValue = input.value.trim();
            break;
          default:
            inputValue;
            break;
        }
        inputsValues = { ...inputsValues, [inputName]: inputValue };
      }
    });
    return inputsValues;
  };

  clearInputsValues = () => {
    let formID = this.state.formID;
    let inputs = document.getElementById(formID).getElementsByTagName("input");
    Array.from(inputs).forEach((input) => {
      let inputDefaultValue = this.getDefaultValue(input);
      input.type === "checkbox"
        ? (input.checked = inputDefaultValue)
        : (input.value = inputDefaultValue);
    });
  };

  onInputChange = (event) => {
    let inputName = event.target.name;
    this.checkValidation(inputName);
    this.setState({ formInputsChanged: true });
  };

  checkValidation = (inputName) => {
    let inputsValidation = this.state.formSchema.Columns.filter((column) => {
      return column.Name === inputName;
    });
    let inputValidation = inputsValidation[0].validation;
    // console.log(inputValidation);
  };

  getDefaultValue = (input) => {
    let inputName = input.name;
    let inputType = input.type;
    let inputsDefaultValue = this.state.formSchema.Columns.filter((column) => {
      return column.Name === inputName;
    });
    let defaultValue = inputsDefaultValue[0].Config.defaultValue;
    switch (inputType) {
      case "checkbox":
        return defaultValue === undefined ? false : Number(defaultValue);
      case "number":
        return defaultValue === undefined ? 0 : Number(defaultValue);
      case "text":
        return defaultValue === undefined
          ? ""
          : defaultValue.replace(/[']/g, "");
      case "password":
        return defaultValue === undefined ? "" : defaultValue;
      case "hidden":
        return (defaultValue = "");
      default:
        return defaultValue;
    }
  };

  onCancel = () => {
    this.setState({ formInputsChanged: false }, () => {
      this.clearInputsValues();
      this.props.hideModal();
    });
  };

  onOK = () => {
    if (this.state.formInputsChanged) {
      let recordset = this.getInputsValues("httpData");
      this.props.addData(recordset);
    }
  };

  controlsAction = (controlType) => {
    switch (controlType) {
      case "CANCEL":
        this.onCancel();
        break;
      case "OK":
        this.onOK();
        break;
      default:
        console.log("Form control not Specified...");
        break;
    }
  };

  render() {
    return (
      <div id={this.state.formID} className="InputForm">
        <Header>{this.state.formTitle}</Header>
        <Content className="Content">
          <Inputs
            formSchema={this.state.formSchema}
            parentID={this.state.formID}
            onInputChange={(event) => this.onInputChange(event)}
          />
          <br />
          <Controls
            formType={this.state.formType}
            controlsAction={(controlType) => this.controlsAction(controlType)}
            inputsChanged={this.state.formInputsChanged}
          />
        </Content>
        <Footer>Form Footer</Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    BuiltInTables: state.Databases.BuiltInTables,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
