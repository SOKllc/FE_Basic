// httpURL
const currentDirectory = "";
const currentPage = "Preferances";
let httpURL = currentDirectory
  ? currentDirectory + "/" + currentPage
  : currentPage;

// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import * as actionsTypes from "../../../Store/Actions/Actions";

// Connections
import AxiosInstance from "../../../Connections/Axios/Axios";

// Components
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../Spinner/Spinner";
import Form from "../../Form/Form";

class Preferances extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AxiosInstance.get(`/${httpURL}`).then((res) => {
      this.setState({ ...res.data, DataStatus: true });
    });
  };

  addData = (recordset) => {
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.post(
          `/${httpURL}`,
          recordset
        ).then(() => {
          resolve();
          this.getData();
        });
      });
    });
  };

  editData = (ID, recordset) => {
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.put(
          `/${httpURL}/${ID}`,
          recordset
        ).then(() => {
          resolve();
          this.getData();
        });
      });
    });
  };

  deleteData = (ID) => {
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.delete(`/${httpURL}/${ID}`).then(
          () => {
            resolve();
            this.getData();
          }
        );
      });
    });
  };

  render() {
    let recordsets = !this.state.DataStatus ? [] : this.state.Connection.Data;

    let Content = (
      <Aux>
        <Form
          {...this.props}
          title={currentPage}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferances);
