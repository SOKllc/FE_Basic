const currentDirectory = "";
const currentPage = "Login";
let httpURL = currentDirectory
  ? currentDirectory + "/" + currentPage
  : currentPage;

import * as Utilities from "../../Utilities/Utilities";

import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionsTypes from "../../Store/Actions/Actions";

import AxiosInstance from "../../Connections/Axios/Axios";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../UI/Spinner/Spinner";

import Form from "../../UI/Form/Form";
import * as formTypes from "../../UI/Form/Types";
import InputForm from "../../UI/Form/InputForm/InputForm";

class Login extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
  };

  componentDidMount() {
    if (!this.props.currentDatabaseName) {
      let currentDatabase = {
        ID: "",
        Name: "SOKllc",
      };
      this.props.setCurrentDatbase(currentDatabase);
    }
    this.getData();
  }

  getData = () => {
    this.setState({ DataStatus: false }, () => {
      AxiosInstance.get(`/${httpURL}`).then((res) => {
        if (res.data.Error) {
          let data = res.data.Connection;
          this.props.errorOccur(data);
        } else {
          if (this.props.errorStatus) this.props.errorClear();
          let data = res.data.Connection.MainData;
          this.props.setDatabases(data);
        }
        this.setState({ ...res.data, DataStatus: true });
      });
    });
  };

  addData = (recordset) => {
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        recordset = {
          ...recordset,
          DatabaseName: this.props.currentDatabaseName
            ? this.props.currentDatabaseName
            : localStorage.getItem("SOKllcDatabaseName"),
        };
        AxiosInstance.post(`/${httpURL}`, recordset).then((res) => {
          resolve();
          if (res.data.Error) {
            let data = res.data.Connection;
            this.props.errorOccur(data);
          } else {
            if (this.props.errorStatus) this.props.errorClear();
            let data = res.data.Connection.MainData;
            let userData = Utilities.trim(data.User);
            this.props.authSuccess(userData);
            let databaseData = data.Database;
            this.props.setCurrentDatbaseINFO(databaseData);
          }
          this.setState({ ...res.data, DataStatus: true }, () =>
            this.props.hideModal()
          );
        });
      });
    });
  };

  render() {
    let recordsets = !this.state.DataStatus
      ? []
      : this.state.Connection.MainData;

    let Content = (
      <Aux>
        <Form
          {...this.props}
          Type={formTypes.INPUT_FORM}
          formName={currentPage}
          addData={(recordset) => this.addData(recordset)}
        />
      </Aux>
    );
    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return {
    errorStatus: state.Error.Status,
    currentDatabaseName: state.Databases.CurrentDatabase.Name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorOccur: (data) =>
      dispatch({ type: actionsTypes.ERROR_OCCUR, data: data }),
    errorClear: () => dispatch({ type: actionsTypes.ERROR_CLEAR }),
    setDatabases: (data) =>
      dispatch({ type: actionsTypes.SET_DATABASES, data: data }),
    authSuccess: (data) =>
      dispatch({ type: actionsTypes.AUTH_SUCCESS, data: data }),
    setCurrentDatbase: (data) =>
      dispatch({ type: actionsTypes.SET_CURRENT_DATABASE, data: data }),
    setCurrentDatbaseINFO: (data) =>
      dispatch({ type: actionsTypes.SET_CURRENT_DATABASE_INFO, data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
