import './App.css';
import React, { Component } from "react";

class App extends Component {
  state = {
    name: ""
  }

  componentDidMount() {
    fetch("http://localhost:3001")
      .then(res => res.json())
      .then(data => this.setState({ name: data.name }))
  }

  render() {
    return (
      <h1>Hello 2 {this.state.name}!</h1>
    )
  }
}

export default App;
