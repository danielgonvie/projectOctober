import React, { Component } from "react";
import { Link } from "react-router-dom";

import RoomComponent from '../../components/RoomComponent/RoomComponent';
import "./HomePage.scss";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }


  render() {
    return (
      <div className="home-page">
        <h1 className="home-title">HOME PAGE</h1>
        <p>Bienvenido {this.state.user.username}</p>
        <RoomComponent user={this.state.user}></RoomComponent>
        <Link onClick={e => this.props.logout(e)} to="/">
          <h1>LOGOUT</h1>
        </Link>

      </div>
    );
  }
}
