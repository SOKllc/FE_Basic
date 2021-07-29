// Local
const currentDirectory = "Admin";
const currentPage = "Users";

// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import * as actionsTypes from "../../../Store/Actions/Actions";

// Connections
import AxiosInstance from "../../../Connections/Axios/Axios";

// Components
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../../UI/Spinner/Spinner";
import Form from "../../../UI/Form/Form";

class Users extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AxiosInstance.get(`/${currentDirectory}/${currentPage}`).then((res) => {
      this.setState({ ...res.data, DataStatus: true });
    });
  };

  addData = (recordset) => {
    return new Promise((resolve, reject) => {
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.post(
          `/${currentDirectory}/${currentPage}`,
          recordset
        ).then(() => {
          resolve();
          this.getData();
        });
      });
    });
  };

  editData = (recordset) => {
    return new Promise((resolve, reject) => {
      let recordsetID = recordset.ID;
      this.setState({ DataStatus: false }, () => {
        AxiosInstance.put(
          `/${currentDirectory}/${currentPage}/:${recordsetID}`,
          recordset
        ).then(() => {
          resolve();
          this.getData();
        });
      });
    });
  };

  render() {
    let recordsets = !this.state.DataStatus
      ? []
      : this.state.ConnectionData.recordsets[0];

    let Content = (
      <Aux>
        <Form
          {...this.props}
          title={currentPage}
          recordsets={recordsets}
          addData={(recordset) => this.addData(recordset)}
          editData={(recordset) => this.editData(recordset)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
