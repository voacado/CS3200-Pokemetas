import React, { useState } from 'react';
import { ReactComponent as PokeMetasSvg } from '../../images/pokemetas.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MenuIcon from '../menu/MenuIcon';
import DropdownMenu, { DropdownItem } from '../menu/DropdownMenu';

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
const Navbar = (props) => {
  let displayCorrectIcon;

    if (props.token) {
      displayCorrectIcon = (
        <NavBtn>
        <MenuIcon icon={<FontAwesomeIcon icon={faUserCircle} />}>
            <DropdownMenu>
              <DropdownItem leftIcon={<FontAwesomeIcon icon={faUserCircle} />}>My Profile</DropdownItem>
              <DropdownItem leftIcon={<FontAwesomeIcon icon={faUsers} />} link='/my-teams'>My Teams</DropdownItem>
              <DropdownItem 
                leftIcon={<FontAwesomeIcon icon={faSignOutAlt} />} 
                link='/logout'>
                  Log Out
              </DropdownItem>
            </DropdownMenu>
          </MenuIcon>
          </NavBtn>
      )
    } else {
      displayCorrectIcon = (
        <NavBtn>
        <NavBtnLink to='/login'>Login</NavBtnLink>
        <NavBtnLink to='/register'>Register</NavBtnLink>
        </NavBtn>
      )
    }

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
          <NavLink to='/my-teams' activestyle="true">
            My Teams
          </NavLink>
          <NavLink to='/single-team-eval' activestyle="true">
            Team Evaluator
          </NavLink>
        </NavMenu>
        {displayCorrectIcon}
      </Nav>
    </>
  );
};

export default Navbar;
