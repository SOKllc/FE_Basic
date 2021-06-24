const currentPage = "Home";

import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

class Home extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
  };

  render() {
    return <Aux>{this.state.WelcomeMessage}</Aux>;
  }
}

export default Home;
