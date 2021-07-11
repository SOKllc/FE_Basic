// Local
const currentDirectory = "Admin";
const currentPage = "Users";

import React, { Component } from "react";

// Connections
import AxiosInstance from "../../../Connections/Axios/Axios";

// Components
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../../UI/Spinner/Spinner";
import Form from "../../../UI/Form/Form";

import Preferance from "../../../UI/Routes/Preferances/Preferances";

class Users extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    getDataStatus: false,
  };

  componentDidMount() {
    AxiosInstance.get(`/${currentDirectory}/${currentPage}`).then((res) => {
      this.setState({ ...res.data, getDataStatus: true });
    });
  }

  render() {
    let recordsets = !this.state.getDataStatus
      ? []
      : this.state.ConnectionData.recordsets[0];

    let Content = (
      <Aux>
        <Form {...this.props} title={currentPage} recordsets={recordsets} />
      </Aux>
    );

    return !this.state.getDataStatus ? <Spinner /> : Content;
  }
}

export default Users;
