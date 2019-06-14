import React from "react";
import axios from "axios";

import './components.css';

export default class SignIn extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <>
        <h2>Sign in please</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Okay</button>
          </div>
        </form>
      </>
    );
  }

  handleChange = e => {
    //capture the values you want to change
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const endpoint = "http://localhost:3000/api/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log("sign in response", res.data);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.log("sign in failure", err);
      });
  };
}
