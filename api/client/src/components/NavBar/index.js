import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavBarElements'

const NavBar = () => {
  return (
    <>
    <Nav>
      <NavLink to="/">
      <h1>ETSY</h1>
      <img src="etsy.png" alt=''></img>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/about">Favorites</NavLink>
        <NavLink to="/about">Profile</NavLink>
        <NavLink to="/about">Cart</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </NavMenu>
    </Nav>
    </>
  );
};

export default NavBar