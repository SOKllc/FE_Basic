// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";

import "./Form.css";

import Alert from "./Alert/Alert";
import Header from "../../Components/MyComponents/Header/Header";
import Content from "../../Components/MyComponents/Content/Content";
import Footer from "../../Components/MyComponents/Footer/Footer";
import Navigation from "./Navigation/Navigation";
import Inputs from "./Inputs/Inputs";
import Controls from "./Controls/Controls";

class Form extends Component {
  state = {
    formSchema: this.props.Schema.Tables[this.props.title],
    formAlert: null,
    formAddNew: this.props.recordsets.length === 0 ? true : false,
    formDataStatus: this.props.recordsets ? true : false,
    formTitle: this.props.title,
    formID: this.props.formID
      ? this.props.title + this.props.formID
      : this.props.title,
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
          let inputValue = recordset[inputName];
          let inputID = formID + "-" + inputName;
          let input = document.getElementById(inputID);
          let inputType = input.type;
          inputType === "checkbox"
            ? (input.checked = inputValue ? true : false)
            : (input.value = inputValue);
        });
      }
    }
  };

  getInputsValues = () => {
    let formID = this.state.formID;
    let inputs = document.getElementById(formID).getElementsByTagName("input");
    let updatedInputs = {};
    Array.from(inputs).forEach((input) => {
      let inputValue =
        input.type === "checkbox"
          ? input.checked
            ? true
            : false
          : input.value;
      updatedInputs = { ...updatedInputs, [input.name]: inputValue };
    });
    return updatedInputs;
  };

  clearInputsValues = () => {
    let formID = this.state.formID;
    let inputs = document.getElementById(formID).getElementsByTagName("input");
    Array.from(inputs).forEach((input) => {
      input.type === "checkbox" ? (input.checked = false) : (input.value = "");
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

  onInputChange = () => {
    this.setState({ formInputsChanged: true });
  };

  // Check if any changes accured compared with the oldRecordset
  checkChanges = () => {
    if (this.state.formAddNew) {
      let formID = this.state.formID;
      let checkValues = [];
      let inputs = document
        .getElementById(formID)
        .getElementsByTagName("input");
      Array.from(inputs).forEach((input) => {
        return input.type === "checkbox"
          ? (checkValues = [...checkValues, input.checked === false])
          : (checkValues = [...checkValues, input.value === ""]);
      });
      return !checkValues.includes(false);
    } else {
      let originalRecordset = this.state.formRecordset;
      let changedRecordset = this.getInputsValues();
      return !Object.keys(originalRecordset)
        .map((inputName) => {
          let originalValue =
            originalRecordset[inputName] === null
              ? 0
              : originalRecordset[inputName];
          return originalValue == changedRecordset[inputName];
        })
        .includes(false);
    }
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

  onSave = () => {
    // on Add New...
    if (this.state.formAddNew) {
      if (this.checkChanges()) {
        return;
      } else {
        let formID = this.state.formID;
        let newRecordset = {};
        let inputs = document
          .getElementById(formID)
          .getElementsByTagName("input");
        Array.from(inputs).forEach((input) => {
          return input.type === "checkbox"
            ? (newRecordset = {
                ...newRecordset,
                [input.name]: input.checked,
              })
            : (newRecordset = {
                ...newRecordset,
                [input.name]: input.value,
              });
        });
        this.props.addData(newRecordset);
      }
      // on Edit...
    } else {
      if (this.checkChanges()) {
        return;
      } else {
        let updatedRecordset = this.getInputsValues();
        this.props.editData(updatedRecordset);
      }
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

  onClose = () => {
    if (this.checkChanges()) {
      this.props.hideModal();
    } else {
      console.log("unHandeled Changes...");
    }
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
      default:
        console.log("Form control not Specified...");
        break;
    }
  };

  render() {
    return (
      <div id={this.state.formID} className="Form">
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
            onInputChange={() => this.onInputChange()}
          />
          <br />
          <Controls
            controlsAction={(controlType) => this.controlsAction(controlType)}
            hideModal={this.props.hideModal}
            addNew={this.state.formAddNew}
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
    Schema: state.Schema,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
