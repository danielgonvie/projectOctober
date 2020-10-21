import React, { Component } from "react";
import "./SearchBar.scss";

export default class SearchBar extends Component {
  render() {
    //Multi-language
    let text1;
    if (this.props.lang === true) {
      text1 = "Search users...";
    } else {
      text1 = "Buscar usuarios...";
    }

    return (
      <div className="searchbar-component">
        <input
          className="searchbar-field"
          placeholder={text1}
          onChange={this.props.search}
          onKeyDown={this.props.onkey}
          type="text"
        ></input>
      </div>
    );
  }
}
