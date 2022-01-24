import React from 'react'
import { useSelector } from 'react-redux'
import Flex from '../common/Flex'
import TransactionItem from '../TransactionItem'

const Transactions = ({ limit = 5 }) => {
  const transactions = useSelector((state) => state.transactions.value)

  //show only the latest (n) transactions in desc order of purchase to the client
  const recentTransactions = transactions.slice(0, limit).reverse()

  return (
    <div>
      <h2>Latest Transactions</h2>
      <hr></hr>

      {transactions.length === 0 && <span>No Recent Activity</span>}

      <Flex flexDirection='column' flexGap={10}>
        {recentTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Flex>
    </div>
  )
}

export default Transactions
