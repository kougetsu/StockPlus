import React from 'react'
import Flex from '../common/Flex'
import FlexItem from '../common/FlexItem'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCart,
  removeFromCart,
  setPaymentProcessing,
} from '../../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { decrementByAmount } from '../../features/accountBalance/accountBalanceSlice'
import { addTransaction } from '../../features/transactions/transactionsSlice'
import Button from '../common/Button'
import formatAmount from '../../utils/formatAmount'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.value)
  const accountBalance = useSelector((state) => state.accountBalance.value)
  const marketOpen = useSelector((state) => state.cart.isMarketOpen)
  const paymentProcessing = useSelector((state) => state.cart.paymentProcessing)

  const dispatch = useDispatch()

  const calculateCartAmount = () => {
    if (cartItems.length === 0) return 0

    const amount = cartItems.map((item) => item.value).reduce((a, b) => a + b)
    return parseFloat(amount.toFixed(2))
  }

  const removeCartItem = (item) => {
    dispatch(removeFromCart(item.id))
  }

  const createPurchase = () => {
    //can only purchase if market is open
    if (!marketOpen) return

    const upperLimit = 1000000
    //validate having enough balance to purchase stock amount
    const totalItemsValue = calculateCartAmount()

    if (accountBalance < totalItemsValue) {
      toast.error('Not Enough Balance.', {
        hideProgressBar: true,
        autoClose: 2000,
      })
      return
    } else if (totalItemsValue > upperLimit) {
      //validate total transaction must be below 1 million dollars
      toast.error(`Maximum Purchase Value is ${formatAmount(upperLimit)}`, {
        hideProgressBar: true,
        autoClose: 2000,
      })
      return
    }

    //simulate api call and payment process
    dispatch(setPaymentProcessing(true))
    setTimeout(() => {
      //decrease account balance by amount purchased
      dispatch(decrementByAmount(totalItemsValue))
      //add transaction to the store
      dispatch(
        addTransaction({
          totalAmount: totalItemsValue,
          createdAt: new Date().toISOString(),
          items: cartItems,
        })
      )
      dispatch(setPaymentProcessing(false))

      //empty cart after payment successful
      dispatch(clearCart())

      //alert user
      toast.success('Payment Successful!', {
        hideProgressBar: true,
        autoClose: 2000,
      })
    }, 1000)
  }

  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center'>
        <FlexItem>
          <h4>Cart Items</h4>
        </FlexItem>
        <FlexItem style={{ textAlign: 'end' }}>
          <div>
            <small>Total</small>
          </div>
          {formatAmount(calculateCartAmount())}
        </FlexItem>
      </Flex>
      <hr style={{ marginBottom: 15 }}></hr>
      {cartItems.length === 0 ? (
        <span>Cart is empty.</span>
      ) : (
        <Flex flexDirection='column' flexGap={10} flexWrap='wrap'>
          {cartItems.map((item) => (
            <FlexItem key={item.id}>
              <CartItem
                item={item}
                disableItemDelete={paymentProcessing}
                onRemoveItem={removeCartItem}
              />
            </FlexItem>
          ))}
          <FlexItem>
            <Button
              uppercase
              text='Checkout'
              loading={paymentProcessing}
              disabled={!marketOpen}
              onClick={createPurchase}
            ></Button>
          </FlexItem>
        </Flex>
      )}
    </div>
  )
}

export default Cart
