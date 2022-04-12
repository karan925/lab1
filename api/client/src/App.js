import './App.css';
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import Main from './components/Main';
import Register from './components/register';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import NavBar from './components/NavBar/index';
import Home from './pages/home';
import auth1Service from './services/auth1Service';
import SearchBar from './components/searchBar';
import ProfileUpdate from './pages/profile';
import CreateShop from './pages/shop';
import Cart from './pages/cart';
import Favorites from './pages/favorites';
import Purchases from './pages/purchases';
import Footer from './components/NavBar/footer';
import Logout from './components/logout';
import {Navbar, NavDropdown, Container, Nav} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  
  constructor(props){
    super();
    this.state = {
    };

  }

  render() {

    const user = auth1Service.getCurrentUser();

    if (user) {
      console.log(user);
    }

    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
          <img
            src="/etsy1.png"
            width="60"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='ms-auto'>
              {!user && (
                <Nav.Link href="/login">Sign In</Nav.Link>
              )}
               {user && (
                 <React.Fragment>
                   <Nav.Link href="/favorites">Favorites</Nav.Link>
                   <NavDropdown title="Your Account" id="basic-nav-dropdown" >
                    <NavDropdown.Item href="/purchases">Purchases</NavDropdown.Item>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                  </NavDropdown>
                 </React.Fragment>
              )}
              <Navbar.Brand href="/cart">
              <img
                src="/cart2.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<ProfileUpdate />} />
          <Route path='/create_shop' element={<CreateShop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }
}

export default App;
