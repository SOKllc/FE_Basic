import React, { Component } from "react";
import { connect } from "react-redux";

import "./DataForm.css";

import Alert from "../Alert/Alert";
import Header from "../../../Components/MyComponents/Header/Header";
import Content from "../../../Components/MyComponents/Content/Content";
import Footer from "../../../Components/MyComponents/Footer/Footer";
import Navigation from "../Navigation/Navigation";
import Inputs from "../Inputs/Inputs";
import Controls from "../Controls/Controls";

class DataForm extends Component {
  state = {
    formType: "DataForm",
    formName: this.props.formName,
    formSchema: this.props.Tables[this.props.formName],
    formAlert: null,
    formAddNew: this.props.recordsets.length === 0 ? true : false,
    formDataStatus: this.props.recordsets ? true : false,
    formTitle: this.props.formName,
    formID: this.props.formID
      ? this.props.formName + this.props.formID
      : this.props.formName,
    formTotalRecords: this.props.recordsets
      ? this.props.currentRecord
        ? 1
        : this.props.recordsets.length
      : 0,
    formCurrentRecord: this.props.currentRecord ? this.props.currentRecord : 0,
    formRecordsets: this.props.recordsets,
    formRecordset:
      this.props.recordsets.length > 0
        ? this.props.recordsets[
            this.props.currentRecord ? this.props.currentRecord : 0
          ]
        : {},
    formInputsChanged: false,
  };

  showAlert = (formAlert) => {
    this.setState({ formAlert: formAlert }, this.alertResponse());
  };

  hideAlert = () => {
    this.setState({ formAlert: null });
  };

  alertAction = (alertResponse) => {
    let updatedFormAlert = { ...this.state.formAlert, response: alertResponse };
    this.setState({ formAlert: updatedFormAlert }, this.alertResponse());
  };

  alertResponse = () => {
    return () => {
      let alertResponse = this.state.formAlert.response;
      switch (alertResponse) {
        case "YES":
          this.onSave();
          break;
        case "NO":
          this.onCancel();
          break;
        case "CANCEL":
          this.hideAlert();
          break;
        default:
          break;
      }
    };
  };

  componentDidMount = () => {
    this.setInputsValues(this.state.formRecordset);
  };

  setInputsValues = (recordset) => {
    if (this.state.formDataStatus) {
      let formID = this.state.formID;
      if (this.state.formRecordset) {
        Object.keys(recordset).map((inputName) => {
          let inputID = formID + "-" + inputName;
          let input = document.getElementById(inputID);
          let inputValue = recordset[inputName];
          let inputType = input.type;
          switch (inputType) {
            case "checkbox":
              input.checked = inputValue ? true : false;
              break;
            case "number":
              inputValue === null
                ? (input.value = 0)
                : (input.value = inputValue);
              break;
            case "text":
              inputValue === null
                ? (input.value = "")
                : (input.value = inputValue.trim());
              break;
            case "password":
              inputValue === null
                ? (input.value = "")
                : (input.value = inputValue.trim());
              break;
            default:
              input.value = inputValue;
              break;
          }
        });
      }
    }
  };

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

  onCurrentRecord = (newRecord) => {
    if (this.state.formDataStatus) {
      let recordset = this.state.formRecordsets[newRecord];
      if (this.checkChanges()) {
        this.setInputsValues(recordset);
        this.setState({
          formAddNew: false,
          formCurrentRecord: newRecord,
          formRecordset: recordset,
          formInputsChanged: false,
        });
      } else {
        let newAlert = {
          massage: "Data changed, do you want to save",
          response: null,
          newRecord: newRecord,
        };
        this.showAlert(newAlert);
      }
    }
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

  getDataValue = (input) => {
    let inputName = input.name;
    let inputType = input.type;
    let dataValue = this.state.formRecordset[inputName];
    switch (inputType) {
      case "checkbox":
        return dataValue === null ? false : dataValue;
      case "number":
        return dataValue === null ? 0 : dataValue;
      case "text":
        return dataValue === null ? "" : dataValue.trim();
      case "password":
        return dataValue === null ? "" : dataValue.trim();
      default:
        return dataValue;
    }
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

  // Check if any changes accured compared with the oldRecordset
  checkChanges = () => {
    let checkChanges = [];
    let formID = this.state.formID;
    let inputsValues = this.getInputsValues();
    let inputs = document.getElementById(formID).getElementsByTagName("input");
    Array.from(inputs).forEach((input) => {
      let inputName = input.name;
      let dataValue = this.state.formAddNew
        ? this.getDefaultValue(input)
        : this.getDataValue(input);
      let inputValue = inputsValues[inputName];
      checkChanges.push(dataValue === inputValue);
    });
    return !checkChanges.includes(false);
  };

  onCancel = () => {
    this.setInputsValues(this.state.formRecordset);
    this.setState(
      {
        formAddNew: false,
        formInputsChanged: false,
      },
      () => {
        if (this.state.formAlert) {
          let newRecord = this.state.formAlert.newRecord;
          this.onCurrentRecord(newRecord);
        }
        this.hideAlert();
      }
    );
  };

  onClose = () => {
    if (this.checkChanges()) {
      this.onCancel();
      this.props.hideModal();
    } else {
      console.log("unHandeled Changes...");
    }
  };

  onAddNew = () => {
    if (this.checkChanges()) {
      this.clearInputsValues();
      this.setState({ formAddNew: true });
    } else {
      let newFormAlert = {
        massage: "Data changed, do you want to save?",
        response: null,
      };
      this.showAlert(newFormAlert);
    }
  };

  onSave = () => {
    if (this.checkChanges()) {
      this.onCancel();
      return;
    } else {
      let recordset = this.getInputsValues("httpData");
      let httpID = this.state.formRecordset["ID"];
      this.state.formAddNew
        ? this.props.addData(recordset)
        : this.props.editData(httpID, recordset);
    }
  };

  onDelete = () => {
    let httpID = this.state.formRecordset["ID"];
    this.props.deleteData(httpID);
  };

  controlsAction = (controlType) => {
    switch (controlType) {
      case "CANCEL":
        this.onCancel();
        break;
      case "SAVE":
        this.onSave();
        break;
      case "ADD_NEW":
        this.onAddNew();
        break;
      case "CLOSE":
        this.onClose();
        break;
      case "DELETE":
        this.onDelete();
        break;
      default:
        console.log("Form control not Specified...");
        break;
    }
  };

  render() {
    return (
      <div id={this.state.formID} className="DataForm">
        <Alert
          show={this.state.formAlert}
          formAlert={this.state.formAlert}
          alertAction={(alertResponse) => this.alertAction(alertResponse)}
          onYes={this.onSave}
          onNo={this.onCancel}
        />
        <Header>{this.state.formTitle}</Header>
        <Content className="Content">
          <Navigation
            totalRecords={this.state.formTotalRecords}
            currentRecord={this.state.formCurrentRecord}
            onCurrentRecord={(newRecord) => this.onCurrentRecord(newRecord)}
            onAddNew={this.onAddNew}
            hideModal={this.props.hideModal}
            addNew={this.state.formAddNew}
          />
          <br />
          <Inputs
            formSchema={this.state.formSchema}
            recordset={this.state.formRecordset}
            parentID={this.state.formID}
            onInputChange={(event) => this.onInputChange(event)}
          />
          <br />
          <Controls
            formType={this.state.formType}
            controlsAction={(controlType) => this.controlsAction(controlType)}
            hideModal={this.props.hideModal}
            addNew={this.state.formAddNew}
            emptyData={this.props.recordsets.length === 0}
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
    Tables: state.Databases.CurrentDatabase.Tables,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DataForm);
