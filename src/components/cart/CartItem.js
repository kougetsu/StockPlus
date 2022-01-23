import React from 'react'
import Flex from '../common/Flex'
import FlexItem from '../common/FlexItem'
import Card from '../common/Card'
import Button from '../common/Button'
import { FaTrash } from 'react-icons/fa'
import formatAmount from '../../utils/formatAmount'

const CartItem = ({ item, onRemoveItem, disableItemDelete }) => {
  const handleRemoveItem = (item) => {
    if (disableItemDelete) return
    onRemoveItem(item)
  }

  return (
    <Card padding>
      <Flex justifyContent='space-between' alignItems='center'>
        <FlexItem>
          <div>
            <small>Amount ({item.stock})</small>
          </div>
          <div>{item.amount.toFixed(5)}</div>
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
            onClick={() => handleRemoveItem(item)}
            disabled={disableItemDelete}
          />
        </FlexItem>
      </Flex>
    </Card>
  )
}

export default CartItem
