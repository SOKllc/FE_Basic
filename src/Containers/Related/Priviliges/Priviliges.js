const currentDirectory = "Related";
const currentPage = "Priviliges";
let httpURL = currentDirectory
  ? currentDirectory + "/" + currentPage
  : currentPage;

import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionsTypes from "../../../Store/Actions/Actions";

import AxiosInstance from "../../../Connections/Axios/Axios";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../../UI/Spinner/Spinner";
import Form from "../../../UI/Form/Form";
import * as Types from "../../../UI/Form/Types";

class Priviliges extends Component {
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
    AxiosInstance.get(`/${httpURL}`, axiosConfig).then((res) => {
      this.setState({ ...res.data, DataStatus: true });
    });
  };

  render() {
    let recordsets = [];
    if (this.state.DataStatus) {
      recordsets = this.state.Connection.MainData;
    }

    let Content = (
      <Aux>
        <Form
          {...this.props}
          Type={this.props.Type ? this.props.Type : Types.DATA_FORM}
          Name={currentPage}
          recordsets={recordsets}
        />
      </Aux>
    );
    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return {
    errorStatus: state.Error.Status,
    databaseName: state.Databases.CurrentDatabase.Name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Priviliges);
