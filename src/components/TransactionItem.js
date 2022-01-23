import React from 'react'
import Card from './common/Card'
import Flex from './common/Flex'
import FlexItem from './common/FlexItem'

const TransactionItem = ({ transaction }) => {
  const transactionTotal = () => {
    return transaction.items.map((item) => item.value).reduce((a, b) => a + b)
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <Card padding>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        flexWrap='wrap'
        flexGap={6}
      >
        <FlexItem>
          <small>
            <div style={{ marginBottom: 4 }}>
              {new Date(transaction.createdAt).toLocaleString('en-US')}
            </div>
            <div>
              <b>Transaction ID</b>
            </div>
            <span>{transaction.id} </span>
          </small>
        </FlexItem>
        <FlexItem style={{ textAlign: 'end' }}>
          <div>
            <small>
              <b>Total Purchase</b>
            </small>
          </div>
          <div>{formatAmount(transactionTotal())}</div>
        </FlexItem>
      </Flex>
    </Card>
  )
}

export default TransactionItem
