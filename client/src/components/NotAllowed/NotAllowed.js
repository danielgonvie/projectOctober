import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NotAllowed.scss";

export default class NotAllowed extends Component {
  render() {


    return (
      <div className="not-allowed-panel">
        <img
          className="not-allowed-gif"
          src="https://media0.giphy.com/media/3oFzmfqgb0Nv1vfncA/giphy.gif?cid=790b76111d5c099e52be50e3f9b40a90cdb56ae56e2c07fe&rid=giphy.gif"
          alt="Suspicious"
        ></img>
        <h2 className="not-allowed-title">ÑO </h2>
        <p className="not-allowed-text">PUEDES</p>

        <p className="not-allowed-text">PASAR!</p>
        <p className="not-allowed-text">
          BOBO
          <Link to="/">GANÉ</Link>


          <Link onClick={e => this.props.logout(e)} to="/">
            LOGOUT
          </Link>
        </p>
      </div>
    );
  }
}
