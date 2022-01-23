import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FaBars, FaTimes } from 'react-icons/fa'
import { breakpoints } from '../app/breakpoints'

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.1);
  z-index: 999;
`

const NavList = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  background-color: #fff;
  margin: 0;
  padding: 0;

  @media screen and (max-width: ${breakpoints.sm}px) {
    flex-direction: column;
    height: auto;
  }
`
const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #002654;
  cursor: pointer;
  padding: 4px 20px;
  margin-right: 6px;
  border-radius: 30px;
  font-size: 1.1rem;
  text-align: center;

  &:hover:not(.active) {
    background-color: #0095ce1a;
  }

  &:active {
    transition: 0.2s;
    transform: scale(95%);
  }

  &.active {
    background-color: #0095ce1a;
  }

  @media screen and (max-width: ${breakpoints.sm}px) {
    width: 100%;
    padding: 10px 0;
    border-radius: 0;
    text-align: center;
    margin-right: 0;

    &:nth-child(1) {
      border-top: 1px solid #ddd;
      margin-top: 45px;
    }
  }
`

// const MenuLogo = styled.div`
//   font-weight: bold;
//   font-size: 1.2rem;
// `

const ToggleMenuButton = styled.button`
  display: none;
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 30px;
  border: none;
  transition: 0.5s;
  background: none;

  &:hover {
    background: #0095ce1a;
    tranform: translateY(4px);
  }

  @media screen and (max-width: ${breakpoints.sm}px) {
    display: block;
  }
`

const NavMenuTop = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <NavBar>
      {/* <MenuLogo>
          <span style={{ color: '#00479d' }}>Stock</span>
          <span style={{ color: '#0085ce' }}>Plus</span>
        </MenuLogo> */}
      {(toggleMenu || props.screenWidth > breakpoints.sm) && (
        <NavList>
          <NavItem to='/'>Portfolio</NavItem>
          <NavItem to='/buy'>Buy Shares</NavItem>
          <NavItem to='/compare'>Compare Stock Prices</NavItem>
        </NavList>
      )}
      <ToggleMenuButton onClick={() => setToggleMenu(!toggleMenu)}>
        {!toggleMenu ? <FaBars /> : <FaTimes />}
      </ToggleMenuButton>
    </NavBar>
  )
}

export default NavMenuTop
