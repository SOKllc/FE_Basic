// Local
const currentPage = "Home";

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
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";

// Forms
import Users from "../../../Containers/Admin/Users/Users";

class Home extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
    Modal: false,
  };

  showModal = () => {
    this.setState({ Modal: true });
  };

  hideModal = () => {
    this.setState({ Modal: false });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AxiosInstance.get("/").then((res) => {
      let data = res.data.Connection.Data;
      this.props.setSchema(data);
      this.setState({ ...res.data, DataStatus: true });
    });
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
      </Aux>
    );
    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSchema: (data) =>
      dispatch({ type: actionsTypes.SET_SCHEMA, data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
