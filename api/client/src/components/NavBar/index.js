import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavLink1} from './NavBarElements'
import authService from '../../services/authService';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar';

const user = authService.getCurrentUser();


const NavBar = () => {
    const logOut = () => {
        console.log("made it here")
        authService.logout();
      };
  return (
    <>
    <Nav>
      <NavLink1 to="/">
      {/* <h1>ETSY</h1> */}
      <img src="./etsy1.png" alt="bug" height={60} left={1000} width={100} />
      </NavLink1>
      <SearchBar />
      <Bars />
      {user && (
          <NavMenu>
           <NavLink to="/about">Favorites</NavLink>
           <NavLink to="/about">Profile</NavLink>
           <NavLink to="/about">Cart</NavLink>
           </NavMenu>
          )}
     {user ? (  
      <NavMenu>
            <NavBtnLink onClick={logOut}>Logout</NavBtnLink>
      </NavMenu>
      ): (
        <NavMenu>
        <NavLink to="/login">Sign In</NavLink>
        <NavLink to="/about">Cart</NavLink>
        </NavMenu>
      )}
    </Nav>
    </>
  );
};

export default NavBar