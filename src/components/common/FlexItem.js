import React from 'react'
import styled from 'styled-components'

const StyledFlexItem = styled.div`
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf}`};
  ${(props) => props.flexBasis && `flex-basis: ${props.flexBasis}`};
  ${(props) => props.flexGrow && `flex-grow: ${props.flexGrow}`};
  ${(props) => props.flexOrder && `order: ${props.flexOrder}`};
  ${(props) => props.flexShrink && `flex-shrink: ${props.flexShrink}`};
  ${(props) => props.flex && `flex: ${props.flex}`};
`

const FlexItem = (props) => {
  return <StyledFlexItem {...props}>{props.children}</StyledFlexItem>
}

export default FlexItem
