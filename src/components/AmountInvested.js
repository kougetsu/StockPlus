import React from 'react'
import { useSelector } from 'react-redux'
import formatAmount from '../utils/formatAmount'

const AmountInvested = () => {
  const transactions = useSelector((state) => state.transactions.value)

  //calculate the total amount for any transactions placed
  const calculateTotalAmountInvested = () => {
    if (transactions.length === 0) return 0

    return transactions
      .map((transaction) => transaction.totalAmount)
      .reduce((a, b) => a + b)
  }

  return (
    <div>
      <b>Amount Invested</b>
      <div>{formatAmount(calculateTotalAmountInvested())}</div>
    </div>
  )
}

export default AmountInvested
