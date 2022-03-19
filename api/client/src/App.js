import './App.css';
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Main from './components/Main';
import Register from './components/register';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/index';
import Home from './pages/index';

class App extends Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
