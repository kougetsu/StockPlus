import React from 'react'
import { Outlet } from 'react-router-dom'
import NavMenuSide from './NavMenuSide'
import styled from 'styled-components'
import NavMenuTop from './NavMenuTop'
import { breakpoints } from '../app/breakpoints'
import { useViewport } from '../hooks/useViewport'

const PageContent = styled.main`
  margin: 0 0 0 250px;

  @media screen and (max-width: ${(props) => props.breakpoint}px) {
    margin: 45px 0 0 0;
  }
`

const Layout = ({ drawerBreakpoint }) => {
  const { width } = useViewport()
  const breakpoint = drawerBreakpoint || breakpoints.md

  return (
    <>
      {width >= breakpoint ? (
        <NavMenuSide />
      ) : (
        <NavMenuTop screenWidth={width} />
      )}
      <PageContent screenWidth={width} breakpoint={breakpoint}>
        <Outlet />
      </PageContent>
    </>
  )
}

export default Layout
