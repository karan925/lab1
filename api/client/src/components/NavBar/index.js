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
      <img src="./etsy1.png" alt="bug" height={60} left={1000} width={100} />
      </NavLink1>
      <SearchBar placeholder={"Search for anything"} />
      <Bars />
      {user && (
          <NavMenu>
           <NavLink to="/about">Favorites</NavLink>
           <NavLink to="/profile">Profile</NavLink>
           </NavMenu>
          )}
     {user ? (  
      <NavMenu>
            <NavBtnLink onClick={logOut}>Logout</NavBtnLink>
            <NavLink to="/about">
        <img src="./cart2.png" alt="bug" height={30} left={10} width={40} /></NavLink>
      </NavMenu>
      ): (
        <NavMenu>
        <NavLink to="/login">Sign In</NavLink>
        <NavLink to="/about">
        <img src="./cart2.png" alt="bug" height={30} left={10} width={40} /></NavLink>
        </NavMenu>
      )}
    </Nav>
    </>
  );
};

export default NavBar