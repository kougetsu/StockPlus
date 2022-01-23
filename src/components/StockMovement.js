import React from 'react'
import Card from './common/Card'
import Flex from './common/Flex'
import FlexItem from './common/FlexItem'
import styled from 'styled-components'

const PriceMovement = styled.div.attrs((props) => ({
  backgroundColor:
    props.percentage > 0 ? 'green' : props.percentage < 0 ? 'red' : 'grey',
}))`
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  border-radius: 25px;
  padding: 4px 16px;
`

const StockMovement = (props) => {
  return (
    <Card padding style={props.style}>
      <Flex justifyContent='space-between' alignItems='center' flexGap={15}>
        <FlexItem>{props.company}</FlexItem>
        <FlexItem>
          <PriceMovement percentage={props.priceMovement}>
            <b>
              {props.priceMovement > 0
                ? `+${props.priceMovement}`
                : props.priceMovement}
              %
            </b>
          </PriceMovement>
        </FlexItem>
        <FlexItem>{props.price}</FlexItem>
      </Flex>
    </Card>
  )
}

export default StockMovement
