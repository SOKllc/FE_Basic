// Local
const currentPage = "Preferances";

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
import Form from "../../Form/Form";

class Preferance extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AxiosInstance.get(`/${currentPage}`).then((res) => {
      this.setState({ ...res.data, DataStatus: true });
    });
  };

  render() {
    let recordsets = !this.state.DataStatus
      ? null
      : this.state.ConnectionData.recordsets[0];

    let Content = (
      <Aux>
        <Form {...this.props} title={currentPage} recordsets={recordsets} />
      </Aux>
    );

    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferance);
