// Local
const currentPage = "Preferances";

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
    AxiosInstance.get(`/${currentPage}`).then((res) => {
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

export default Preferance;
