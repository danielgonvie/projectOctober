import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import AuthService from "./services/AuthService";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import NotAllowed from "./components/NotAllowed/NotAllowed";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null,
    lang: true
  };

  setUser = user => {
    this.setState({ ...this.state, user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleLogout = e => {
    e.preventDefault();
    this.authService.logout(this.state).then(
      () => {
        this.setState({ user: null });
      },
      error => {
        console.error(error);
      }
    );
  };

  switchLang = e => {
    e.preventDefault();
    let lang = !this.state.lang;
    this.setState({ ...this.state, lang: lang });
  };

  render() {
    const { user } = this.state;

    const NoMatch = ({ location }) => (
      <div className="nomatch-component">
        <img
          className="no-gif"
          src="https://media2.giphy.com/media/ly8G39g1ujpNm/giphy.gif?cid=790b761142e4c6ee9a3e38ce715d90695af72b14bdcd671f&rid=giphy.gif"
          alt="404"
        ></img>
        <h3 className="nomatch-info">
          NO SE ENCONTRÓ <code>{location.pathname}</code>
        </h3>
        
        <Link className="safe-link" to="/">
          <h3 className="nomatch-button">HOME</h3>
        </Link>
      </div>
    );

    return (
      <div>
        {user && (
          <Switch>
            <Route
              exact
              path="/"
              render={match => (
                <React.Fragment>
                  <HomePage {...match} user={user} logout={this.handleLogout}></HomePage>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/profile/:id"
              render={match => (
                <React.Fragment>
                  <ProfilePage {...match} user={user} logout={this.handleLogout}></ProfilePage>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/signup"
              render={match => (
                <React.Fragment>
                 <NotAllowed logout={this.handleLogout}></NotAllowed>
                </React.Fragment>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}

        {!user && (
          <Switch>
            <Route
              exact
              path="/"
              render={match => (
                <React.Fragment>
                  <LandingPage {...match} setUser={this.setUser}></LandingPage>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/profile/:id"
              render={match => (
                <React.Fragment>
                  <NotAllowed></NotAllowed>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/signup"
              render={match => (
                <React.Fragment>
                  <SignUpPage {...match} user={user} setUser={this.setUser}></SignUpPage>
                </React.Fragment>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}
      </div>
    );
  }
}
