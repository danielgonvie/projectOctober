import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./ProfilePage.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="login-container">
        <h1 className="login-title">tas en tu perfil lokisimo</h1>
        <Link onClick={e => this.props.logout(e)} to="/">
            <h1>LOGOUT</h1>
          </Link>
      </div>
    );
  }
}
