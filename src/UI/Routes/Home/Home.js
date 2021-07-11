// Local
const currentPage = "Home";

import React, { Component } from "react";

// Connections
import AxiosInstance from "../../../Connections/Axios/Axios";

// Components
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../Spinner/Spinner";
import Modal from "../../Modal/Modal";
import Form from "../../Form/Form";
import Button from "../../Button/Button";

import Users from "../../../Containers/Admin/Users/Users";
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
    this.setState({ Modal: true });
  };

  hideModal = () => {
    this.setState({ Modal: false });
  };

  yieldAlert = () => {
    alert("Hello Alert");
  };

  render() {
    let Content = (
      <Aux>
        <Modal
          show={this.state.Modal}
          showModal={this.showModal}
          hideModal={this.hideModal}
        >
          <Users hideModal={this.hideModal} />
        </Modal>
        {this.state.WelcomeMessage}
        <Button btnType="Normal" clicked={this.showModal}>
          Users
        </Button>
        <Users formID="1" />
        <Button btnType="Normal" clicked={this.yieldAlert}>
          Yield
        </Button>
      </Aux>
    );
    return !this.state.getDataStatus ? <Spinner /> : Content;
  }
}

export default Home;
