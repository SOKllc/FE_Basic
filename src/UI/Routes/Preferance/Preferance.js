const currentPage = "Preferance";

import React, { Component } from "react";

import AxiosInstance from "../../../Connections/Axios/Axios";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../Spinner/Spinner";
class Preferance extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    getDataStatus: false,
  };

  componentDidMount() {
    AxiosInstance.get("/Preferance").then((res) => {
      this.setState({ ...res.data, getDataStatus: true });
    });
  }

  render() {
    let Content = <Aux>{this.state.WelcomeMessage}</Aux>;
    return !this.state.getDataStatus ? <Spinner /> : Content;
  }
}

export default Preferance;
