import React from 'react';
import { ReactComponent as PokeMetasSvg } from '../../images/pokemetas.svg';
import { ReactComponent as UserIcon } from '../../images/userIcon.svg';
import MenuIcon from '../menu/MenuIcon';
import DropdownMenu from '../menu/DropdownMenu';

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
        </NavMenu>
        <NavBtn>
          <MenuIcon icon={<UserIcon />}>
            <DropdownMenu></DropdownMenu>
          </MenuIcon>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
