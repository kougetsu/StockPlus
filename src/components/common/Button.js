import styled from 'styled-components'
import { FaSpinner } from 'react-icons/fa'
import Flex from './Flex'
import FlexItem from './FlexItem'

const StyledButton = styled.button.attrs((props) => ({
  color: props.color || '#405cf5',
  textColor: props.textColor || '#fff',
}))`
  cursor: pointer;
  position: relative;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.color};
  padding: 0 20px;
  border-radius: 8px;
  border-width: 0;
  height: 40px;
  width: 100%;
  line-height: 1.2;
  text-align: center;
  ${(props) => props.uppercase && 'text-transform: uppercase'};
  font-weight: bold;
  transition-duration: 0.4s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  &:hover:not(:disabled) {
    transition-duration: 0.1s;
    filter: brightness(120%);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`

const ButtonIcon = styled.i`
  display: flex;
  font-size: 16px;
`

const Spinner = styled(FaSpinner)`
  animation: rotate 2s linear infinite;
  font-size: 16px;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`

const Button = (props) => {
  return (
    <StyledButton
      color={props.color}
      textColor={props.textColor}
      uppercase={props.uppercase}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Flex alignItems='center' justifyContent='center'>
        <FlexItem>
          {props.loading ? <Spinner /> : <ButtonIcon>{props.icon}</ButtonIcon>}
        </FlexItem>
        {props.text && (
          <FlexItem style={{ marginLeft: 10 }}>
            <span>{props.text}</span>
            <span>{props.children}</span>
          </FlexItem>
        )}
      </Flex>
    </StyledButton>
  )
}

export default Button
