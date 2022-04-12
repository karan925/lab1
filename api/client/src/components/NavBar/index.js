import React from 'react'
// import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavLink1} from './NavBarElements'
import auth1Service from '../../services/auth1Service';
// import { Link } from 'react-router-dom';
// import SearchBar from '../searchBar';
// import Logout from '../logout';
import {Navbar, NavDropdown, Container, Nav} from 'react-bootstrap'

const user = auth1Service.getCurrentUser();

<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

// const NavBar = () => {
//     // const logOut = () => {
//     //     console.log("made it here")
//     //     auth1Service.logout();
//     //   };
//   return (
//     <>
//     <Nav>
//       <NavLink1 to="/">
//       <img src="./etsy1.png" alt="bug" height={60} left={1000} width={100} />
//       </NavLink1>
//       <SearchBar placeholder={"Search for anything"} />
//       <Bars />
//       {user && (
//           <NavMenu>
//            <NavLink to="/favorites">Favorites</NavLink>
//            <NavLink to="/profile">Profile</NavLink>
//            </NavMenu>
//           )}
//      {user ? (  
//       <NavMenu>
//             <NavLink to="/logout">Logout</NavLink>
//             <NavLink to="/cart">
//         <img src="./cart2.png" alt="bug" height={30} left={10} width={40} /></NavLink>
//         <NavLink to="/create_shop">Create Shop</NavLink>
//         <NavLink to="/purchases">Purchases</NavLink>
//       </NavMenu>
//       ): (
//         <NavMenu>
//         <NavLink to="/login">Sign In</NavLink>
//         <NavLink to="/about">
//         <img src="./cart2.png" alt="bug" height={30} left={10} width={40} /></NavLink>
//         </NavMenu>
//       )}
//     </Nav>
//     </>
//   );
// };

// export default NavBar