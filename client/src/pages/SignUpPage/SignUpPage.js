import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import "./SignUpPage.scss";
export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: "",
    name: "",
    pass: true,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state).then(
      user => {
        setUser(user);
        if(user === undefined){
          this.setState({ pass: false });
          
        } else {
          
          history.push("/");
        } 
        
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { username, password, name } = this.state;

    return (
      <div className="signup-container">
        <h1 className="signup-title">Sign up</h1>
        <form className="signup-form" onSubmit={this.handleSignUp}>
          <div className="signup-param">
            <label>Username</label>
            <input
              className="signup-field"
              type="text"
              name="username"
              value={username}
              required
              onChange={this.handleChange}
              placeholder="Username"
              minLength="4"
              maxLength="18"
            />
          </div>
          <div className="signup-param">
            <label>Password </label>
            <input
              className="signup-field"
              type="password"
              value={password}
              minLength="4"
              maxLength="18"
              name="password"
              required
              onChange={this.handleChange}
              placeholder="password"
            />
          </div>
          <div className="signup-param">
            <label>Nickname </label>
            <input
              className="signup-field"
              type="text"
              value={name}
              minLength="4"
              maxLength="18"
              name="name"
              required
              onChange={this.handleChange}
              placeholder="Nickname"
            />
          </div>
          {!this.state.pass ? <p>Nombre de usuario ya cogío</p> : ""}
          <input className="submit-button" type="submit" value="GO" />
        </form>
      </div>
    );
  }
}
