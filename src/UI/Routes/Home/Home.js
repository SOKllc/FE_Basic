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

  showModalHandler = () => {
    this.setState({ Modal: true });
  };

  hideModalHandler = () => {
    this.setState({ Modal: false });
  };

  render() {
    let Content = (
      <Aux>
        <Modal
          show={this.state.Modal}
          showModal={this.showModalHandler}
          hideModal={this.hideModalHandler}
        >
          <Form title={currentPage}/>
        </Modal>
        {this.state.WelcomeMessage}
        <Button btntype='Normal' clicked={this.showModalHandler}>Modal</Button>
      </Aux>
    );
    return !this.state.getDataStatus ? <Spinner /> : Content;
  }
}

export default Home;
