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

/**
 * NavBar that uses Routes to connect to other pages.
 * @returns a React component.
 */
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
          <NavLink to='/about' activestyle="false">
            About
          </NavLink>
          <NavLink to='/single-team-eval' activestyle="true">
            Team
          </NavLink>
          <NavLink to='/compare-teams' activestyle="true">
            Compare Teams
          </NavLink>
          <NavLink to='/search-bar' activestyle="true">
            (Search Bar goes here)
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>

          {/* <NavBtnLink to='/signup'>Sign Up</NavBtnLink> */}
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          {/* <img src="https://img.icons8.com/carbon-copy/50/000000/test-account.png"/> */}
          

          <NavBtnLink to='/login'>
          <FontAwesomeIcon icon={ faUserCircle } size="2x"/>
        </NavBtnLink>

        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
