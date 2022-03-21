import React from "react";
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavLink1} from './NavBarElements'
import authService from '../../services/authService';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import SimpleReactFooter from "simple-react-footer";

function Footer() {
    const description = "According to wikipedia, the cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact.";
    const title = "Cats";
  return (
    <div class = "footer">
      <Nav>
          <h3 class = "footer-ele1">United States</h3>
          <div>
            <h3 class = "footer-ele2">|</h3>
          </div>
          <div>
          <h3 class = "footer-ele2">English</h3>
          </div>
          <div>
          <h3 class = "footer-ele3">|</h3>
          </div>
          <div>
          <h3 class = "footer-ele4">($)USD</h3>
          </div>
      </Nav>
      </div>
  );
}
export default Footer;