import React from 'react'
import Flex from '../common/Flex'
import FlexItem from '../common/FlexItem'
import Card from '../common/Card'
import Button from '../common/Button'
import { FaTrash } from 'react-icons/fa'

const CartItem = ({ item, formatAmount, onRemoveItem }) => {
  return (
    <Card padding>
      <Flex justifyContent='space-between' alignItems='center'>
        <FlexItem>
          <div>
            <small>Amount ({item.stock})</small>
          </div>
          <div>{item.amount}</div>
        </FlexItem>
        <FlexItem>
          <div>
            <small>Value</small>
          </div>
          {formatAmount(item.value)}
        </FlexItem>
        <FlexItem>
          <Button
            color='red'
            icon={<FaTrash></FaTrash>}
            onClick={() => onRemoveItem(item)}
          />
        </FlexItem>
      </Flex>
    </Card>
  )
}

export default CartItem
