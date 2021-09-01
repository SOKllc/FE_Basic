// httpURL
const currentDirectory = "";
const currentPage = "Preferances";
let httpURL = currentDirectory
  ? currentDirectory + "/" + currentPage
  : currentPage;

// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import * as actionsTypes from "../../../Store/Actions/Actions";

// Connections
import AxiosInstance from "../../../Connections/Axios/Axios";

// Components
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../../UI/Spinner/Spinner";
import DataForm from "../../../UI/Form/DataForm/DataForm";

class Preferances extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
    DataStatus: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AxiosInstance.get(`/${httpURL}`).then((res) => {
      this.setState({ ...res.data, DataStatus: true });
    });
  };

  render() {
    let recordsets = !this.state.DataStatus ? [] : [this.props.UserPreferances];
    
    let Content = (
      <Aux>
        <DataForm
          {...this.props}
          formName={currentPage}
          recordsets={recordsets}
        />
      </Aux>
    );
    return !this.state.DataStatus ? <Spinner /> : Content;
  }
}

const mapStateToProps = (state) => {
  return {
    UserPreferances: state.Preferances,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferances);
