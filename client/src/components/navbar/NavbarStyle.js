import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #000;
  width: auto;
  height: 85px;
  display: flex;
  justify-content: space-between;
  // padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  overflow: hidden;

  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLinkIcon = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.active {
    color: #15cdfc;
  }

  &:hover {
    transform: scale(1.1);
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 50%;
  cursor: pointer;

  -moz-transition: all .2s ease-in;
  -o-transition: all .2s ease-in;
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;

  // &.active {
  //   color: #15cdfc;
  //   color: #4370D0;
  // }

  &:hover {
    // color: #9fb7e8;
    // box-shadow: 0 4px 0 -2px #4370D0;

    color: #369cb8;
    box-shadow: 0 4px 0 -2px #369cb8;

  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  width: 83vw;
  // white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #4470BD;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: filter 1s;
  text-decoration: none;

  height: auto;
  width: auto;

  margin-left: 24px;

  &:hover {
    filter: brightness(1.3);
  }
`;