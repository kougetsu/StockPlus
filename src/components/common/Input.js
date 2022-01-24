import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  min-height: 38px;
  outline: 0 !important;
  padding: 2px 8px;
  font-size: 1.05rem;
  margin-top: 10px;
`

const Input = (props) => {
  return <StyledInput {...props}></StyledInput>
}

export default Input
