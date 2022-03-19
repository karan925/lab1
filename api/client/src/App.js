import './App.css';
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Main from './components/Main';
import Register from './components/register';
import {BrowserRouter} from 'react-router-dom';
import NavBar from './components/navBar';

class App extends Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
      <NavBar />
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Register/>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
