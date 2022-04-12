import React, { Component } from "react";
import auth1Service from "../services/auth1Service";
import { Navigate } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    const user = auth1Service.getCurrentUser();

    if (user) {
        auth1Service.logout();
      window.location = "/";
    } else {
      <Navigate
        to={{
          pathname: "/",
        }}
      ></Navigate>;
    }
  }

  render() {
    return null;
  }
}

export default Logout;
