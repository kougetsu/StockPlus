import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementByAmount } from '../../features/accountBalance/accountBalanceSlice'
import Button from '../common/Button'
import { FaCreditCard } from 'react-icons/fa'
import { breakpoints } from '../../app/breakpoints'
import styled from 'styled-components'

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoints.md}px) {
    display: block;
    text-align: center;
  }
`

const AddBalanceWrapper = styled.div`
  margin-left: 25px;

  @media screen and (max-width: ${breakpoints.md}px) {
    margin: 10px 0 0 0;
  }
`

const AccountBalance = (props) => {
  const balance = useSelector((state) => state.accountBalance.value)
  const dispatch = useDispatch()
  const [paymentProcessing, setPaymentProcessing] = useState(false)

  const fixedAmount = 1000000

  //simulate api call and process payment
  const handlePayment = () => {
    setPaymentProcessing(true)
    setTimeout(() => {
      dispatch(incrementByAmount(fixedAmount))
      setPaymentProcessing(false)
    }, 1000)
  }

  return (
    <BalanceContainer>
      <div>
        <b>Account Balance</b>
        <div>
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'USD',
          }).format(balance)}
        </div>
      </div>
      <AddBalanceWrapper>
        <Button
          icon={<FaCreditCard />}
          loading={paymentProcessing}
          uppercase
          disabled={paymentProcessing}
          onClick={handlePayment}
          text={
            paymentProcessing
              ? 'Processing'
              : `Add ${new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'USD',
                }).format(fixedAmount)}`
          }
        ></Button>
      </AddBalanceWrapper>
    </BalanceContainer>
  )
}

export default AccountBalance
