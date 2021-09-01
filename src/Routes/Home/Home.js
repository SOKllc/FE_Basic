const currentPage = "Home";

import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionsTypes from "../../Store/Actions/Actions";

import AxiosInstance from "../../Connections/Axios/Axios";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";

import Login from "../../Containers/Login/Login";
import Users from "../../Containers/Admin/Users/Users";

class Home extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
    Modal: false,
    modalForm: null,
  };

  showModal = (modalFormName) => {
    switch (modalFormName) {
      case "Users":
        return this.setState(
          { modalForm: <Users hideModal={this.hideModal} /> },
          () => this.setState({ Modal: true })
        );
      case "Login":
        return this.setState(
          {
            modalForm: (
              <Login hideModal={this.hideModal} getData={this.getData} />
            ),
          },
          () => this.setState({ Modal: true })
        );
      default:
        return this.setState({ Modal: true });
    }
  };

  hideModal = () => {
    this.setState({ Modal: false });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AxiosInstance.get("/").then((res) => {
      this.setState({ ...res.data, DataStatus: true });
    });
  };

  logout = () => {
    this.props.authClear();
    this.props.clearDatabases();
  };

  render() {
    let recordsets = !this.state.DataStatus ? [] : this.state.Connection.MainData;

    let modalForm = this.state.modalForm;

    let Content = (
      <Aux>
        <Modal show={this.state.Modal} hideModal={this.hideModal}>
          {modalForm}
        </Modal>
        {this.state.WelcomeMessage}
        {!this.props.isAuthenticated ? (
          <Aux>
            <Button btnType="Normal" clicked={() => this.showModal("Login")}>
              Login...
            </Button>
          </Aux>
        ) : (
          <Aux>
            <Button btnType="Normal" clicked={() => this.showModal("Users")}>
              Users
            </Button>
            <Button btnType="Normal" clicked={() => this.logout()}>
              Logout...
            </Button>
          </Aux>
        )}
      </Aux>
    );
    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return {
    errorStatus: state.Error.Status,
    isAuthenticated: state.Auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    errorOccur: (data) =>
      dispatch({ type: actionsTypes.ERROR_OCCUR, data: data }),
    errorClear: () => dispatch({ type: actionsTypes.ERROR_CLEAR }),
    authClear: () => dispatch({ type: actionsTypes.AUTH_CLEAR }),
    clearDatabases: () => dispatch({ type: actionsTypes.CLEAR_DATABASES }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
