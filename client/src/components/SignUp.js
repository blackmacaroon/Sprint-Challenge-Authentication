import React from "react";
import axios from "axios";

import './components.css';

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <>
      <h2>create an account</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
              type="password"
            />
          </div>
          <div>
            <button type="submit">Okay</button>
          </div>
        </form>
      </>
    );
  };

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const endpoint = 'http://localhost:3000/api/register';
      const registration = await axios.post(endpoint, this.state)
      if (registration) {
        this.setState({
          username: "",
          password: ""
        })
        this.props.history.push('/signin');
      }
    }
    catch (err) {
      console.error("registration failure", err);
    }
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

}

export default SignUp;