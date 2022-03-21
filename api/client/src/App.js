import './App.css';
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Main from './components/Main';
import Register from './components/register';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/index';
import Home from './pages/home';
import authService from './services/authService';
import SearchBar from './components/searchBar';
import ProfileUpdate from './pages/profile';
import CreateShop from './pages/shop';
import Cart from './pages/cart';
import Favorites from './pages/favorites';
import Purchases from './pages/purchases';
import Footer from './components/NavBar/footer';

class App extends Component {
  
  constructor(props){
    super();
    this.state = {
    };

  }

  render() {

    const user = authService.getCurrentUser();

    if (user) {
      console.log(user);
    }

    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<ProfileUpdate />} />
          <Route path='/create_shop' element={<CreateShop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
