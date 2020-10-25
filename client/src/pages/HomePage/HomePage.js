import React, { Component } from "react";
import { Link } from "react-router-dom";

import ChatBox from '../../components/ChatBox/ChatBox';
import socket from '../../components/Socket/Socket';
import "./HomePage.scss";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };

   

  }

  componentDidMount() {  
    socket.emit('conectado', "hola desde cliente")
  }
  
  render() {

    return (
      <div className="home-page">
        <h1 className="home-title">YOU ARE IN THE HOME BTW</h1>
        <p>Bienvenido {this.state.user.username}</p>
        <ChatBox user={this.state.user}></ChatBox>
        <Link onClick={e => this.props.logout(e)} to="/">
            <h1>LOGOUT</h1>
          </Link>
      </div>
    );
  }
}
