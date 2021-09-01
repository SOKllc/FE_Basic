const currentDirectory = "Admin";
const currentPage = "Users";
let httpURL = currentDirectory
  ? currentDirectory + "/" + currentPage
  : currentPage;

import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionsTypes from "../../../Store/Actions/Actions";

import AxiosInstance from "../../../Connections/Axios/Axios";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../../UI/Spinner/Spinner";
import DataForm from "../../../UI/Form/DataForm/DataForm";

class Users extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let axiosConfig = {
      headers: {
        DatabaseName: this.props.databaseName,
      },
    };
    AxiosInstance.get(`/${httpURL}`, axiosConfig)
      .then((res) => {
        this.setState({ ...res.data, DataStatus: true });
      })
  };

  addData = (recordset) => {
    let axiosConfig = {
      headers: {
        DatabaseName: this.props.databaseName,
      },
    };
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.post(`/${httpURL}`, recordset, axiosConfig)
          .then(() => {
            resolve();
            this.getData();
          })
      });
    });
  };

  editData = (ID, recordset) => {
    let axiosConfig = {
      headers: {
        DatabaseName: this.props.databaseName,
      },
    };
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.put(`/${httpURL}/${ID}`, recordset, axiosConfig).then(
          () => {
            resolve();
            this.getData();
          }
        );
      });
    });
  };

  deleteData = (ID) => {
    let axiosConfig = {
      headers: {
        DatabaseName: this.props.databaseName,
      },
    };
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.delete(`/${httpURL}/${ID}`, axiosConfig).then(() => {
          resolve();
          this.getData();
        });
      });
    });
  };

  render() {
    let recordsets = !this.state.DataStatus ? [] : this.state.Connection.MainData;

    let Content = (
      <Aux>
        <DataForm
          {...this.props}
          formName={currentPage}
          recordsets={recordsets}
          addData={(recordset) => this.addData(recordset)}
          editData={(ID, recordset) => this.editData(ID, recordset)}
          deleteData={(ID) => this.deleteData(ID)}
        />
      </Aux>
    );
    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return { errorStatus: state.Error.Status, databaseName: state.Databases.CurrentDatabase.Name };
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorOccur: (data) =>
      dispatch({ type: actionsTypes.ERROR_OCCUR, data: data }),
    errorClear: () => dispatch({ type: actionsTypes.ERROR_CLEAR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
