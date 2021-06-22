import React, { Component } from "react";

import classes from "./Content.module.css";

import Spinner from "../../../../UI/Spinner/Spinner";

class Content extends Component {
  state = {
    getData: false,
    WelcomeMessage: "Hello Axios...",
  };

  componentDidMount() {
    if (!this.state.getData) {
      setInterval(() => {
        this.setState({ getData: true });
      }, 10 * 1000);
    }
  }

  render() {
    let Content = this.state.getData ? <p>{this.state.WelcomeMessage}</p> : <Spinner />;
    return <div className={classes.Content}>{Content}</div>;
  }
}

export default Content;
