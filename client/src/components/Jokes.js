import React from "react";
import axios from "axios";

import './components.css';

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <h2>User List</h2>
        <ul>
          {this.state.jokes.map(j => {
                return(<li key={j.id}>{j.joke}</li>)
           
          })}
        </ul>
      </>
    );
  }
  componentDidMount() {
    const endpoint = "/api/jokes";

    axios
      .get(endpoint)
      .then(res => {
        console.log("user list", res.data);
        this.setState(() => ({ jokes: res.data.jokes }));
      })
      .catch(({ response }) => {
        console.log("user list error", response);
      });
  }
}

export default Jokes;
