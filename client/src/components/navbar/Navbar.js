import React from 'react';
import { ReactComponent as PokeMetasSvg } from '../../images/pokemetas.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import {
  Nav,
  NavLink,
  NavLinkIcon,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarStyle';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLinkIcon to='/'>
          <PokeMetasSvg 
          height="85px"
          width="150px" />
        </NavLinkIcon>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>

          {/* <NavBtnLink to='/signup'>Sign Up</NavBtnLink> */}
          {/* <NavBtnLink to='/signin'>Sign In</NavBtnLink> */}
          {/* <img src="https://img.icons8.com/carbon-copy/50/000000/test-account.png"/> */}
          

          <NavBtnLink to='/'>
          {/* <img src="https://img.icons8.com/carbon-copy/50/000000/test-account.png"/> */}
          {/* <i className="fas fa-heart"></i>; */}
          <FontAwesomeIcon icon={ faUserCircle } size="2x"/>
        </NavBtnLink>

        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
