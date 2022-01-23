import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const MenuWrapper = styled.div`
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  border-right: 1px solid #eee;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
`

const MenuLogo = styled.div`
  padding: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 15px;
`

const NavList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #002654;
  cursor: pointer;
  padding: 12px 20px;
  margin: 0 15px;
  border-radius: 30px;
  font-size: 1.1rem;
  text-align: center;
  transition: 0.5s;

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
`

const NavMenuSide = () => {
  return (
    <MenuWrapper>
      <MenuLogo>
        <span style={{ color: '#00479d' }}>Stock</span>
        <span style={{ color: '#0085ce' }}>Plus</span>
        <hr style={{ border: '1px solid #eee' }} />
      </MenuLogo>
      <NavList>
        <StyledNavLink to='/'>Portfolio</StyledNavLink>
        <StyledNavLink to='/buy'>Buy Shares</StyledNavLink>
        <StyledNavLink to='/compare'>Compare Stock Prices</StyledNavLink>
      </NavList>
    </MenuWrapper>
  )
}

export default NavMenuSide
