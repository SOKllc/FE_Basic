// Local
const currentPage = "Preferance";

import React, { Component } from "react";

// Connections
import AxiosInstance from "../../../Connections/Axios/Axios";

// Components
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../Spinner/Spinner";
import Form from "../../Form/Form";
class Preferance extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    getDataStatus: false,
  };

  componentDidMount() {
    AxiosInstance.get("/Preferances").then((res) => {
      this.setState({ ...res.data, getDataStatus: true });
    });
  }

  render() {
    let recordsets = !this.state.getDataStatus
      ? []
      : this.state.ConnectionData.recordset;

    let Content = (
      <Aux>
        <Form title={currentPage} recordsets={recordsets} />
      </Aux>
    );

    return !this.state.getDataStatus ? <Spinner /> : Content;
  }
}

export default Preferance;
