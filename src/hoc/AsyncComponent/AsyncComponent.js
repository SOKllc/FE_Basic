import React, { Component, useEffect } from "react";

import Spinner from "../../UI/Spinner/Spinner";

const asyncComponent = (importedComponent) => {
  return class extends Component {
    state = {
      component: null,
      isMounted: false,
    };

    componentDidMount() {
      if (!this.state.isMounted) {
        importedComponent().then((cmp) => {
          this.setState({ component: cmp.default, isMounted: true });
        });
      }
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <Spinner />;
    }
  };
};

export default asyncComponent;
