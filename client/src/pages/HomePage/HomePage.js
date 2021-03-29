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

  searchQuery() {
    let userUrl = document.querySelector('#searchField').value;
    console.log(userUrl, "Qui es esto");
    let params = userUrl.split('&');
    userUrl = params[0];
    userUrl = userUrl.replace('watch?v=', 'embed/');
    console.log(userUrl, "procesado");
    // https://www.youtube.com/watch?v=pdQ3X8Xa80o
    // https://www.youtube.com/embed/pdQ3X8Xa80o?autoplay=1&controls=0
    // https://www.youtube.com/watch?v=iODi7BI1h_w&list=RDiODi7BI1h_w&start_radio=1&t=0

    let youtubeUrl = `${userUrl}?autoplay=1&controls=0`;
    console.log(youtubeUrl, "procesado");
    document.querySelector('iframe').src = youtubeUrl;
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
        <input type="text" id="searchField" name="searchField" />
        <button onClick={e => this.searchQuery()}>Search</button>
        <iframe width="560" height="315" src="" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    );
  }
}
