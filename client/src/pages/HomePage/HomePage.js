import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {


    return (
      <div className="login-container">
        <h1 className="login-title">YOU ARE IN THE HOME BTW</h1>
        <p>Bienvenido {this.state.user.username}</p>
        <Link onClick={e => this.props.logout(e)} to="/">
            <h1>LOGOUT</h1>
          </Link>
      </div>
    );
  }
}
