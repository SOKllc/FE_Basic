const currentPage = "Home";

import React, { Component } from "react";

import AxiosInstance from "../../../Connections/Axios/Axios";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../Spinner/Spinner";
import Modal from "../../Modal/Modal";
class Home extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    getDataStatus: false,
    Modal: false,
  };

  componentDidMount() {
    AxiosInstance.get("/").then((res) => {
      this.setState({ ...res.data, getDataStatus: true });
    });
  }

  showModal = () => {
    console.log('Show Modal')
    this.setState({ Modal: true });
  };

  hideModal = () => {
    console.log('Hide Modal')
    this.setState({ Modal: false });
  };

  render() {
    let Content = (
      <Aux>
        <Modal
          show={this.state.Modal}
          showModal={this.showModal}
          hideModal={this.hideModal}
        >Hello Modal</Modal>
        {this.state.WelcomeMessage}{" "}
        <button onClick={this.showModal}>Modal</button>
      </Aux>
    );
    return !this.state.getDataStatus ? <Spinner /> : Content;
  }
}

export default Home;
