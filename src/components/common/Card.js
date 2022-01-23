import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  ${(props) => !props.flat && 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)'};
  ${(props) => props.color && `background-color: ${props.color}`};
  ${(props) => props.textColor && `color: ${props.textColor}`};
  ${(props) => props.padding && 'padding: 20px'};
`

const Card = (props) => {
  return <StyledCard {...props}>{props.children}</StyledCard>
}

export default Card
