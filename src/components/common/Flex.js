import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.div`
  display: flex;
  width: 100%;
  ${(props) => props.alignContent && `align-content: ${props.alignContent}`};
  ${(props) => props.alignItems && `align-items: ${props.alignItems}`};
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection}`};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};
  ${(props) => props.flexWrap && `flex-wrap: ${props.flexWrap}`};
  ${(props) => props.flexGap && `gap: ${props.flexGap}px`};
`

const Flex = (props) => {
  return <StyledFlex {...props}></StyledFlex>
}

export default Flex
