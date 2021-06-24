const currentPage = "Preferance";

import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

class Preferance extends Component {
  state = {
    WelcomeMessage: `Hello ${currentPage}...`,
  };

  render() {
    return <Aux>{this.state.WelcomeMessage}</Aux>;
  }
}

export default Preferance;
