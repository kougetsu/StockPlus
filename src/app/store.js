import { configureStore } from '@reduxjs/toolkit'
import accountBalanceReducer from '../features/accountBalance/accountBalanceSlice'
import transactionsReducer from '../features/transactions/transactionsSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    accountBalance: accountBalanceReducer,
    transactions: transactionsReducer,
    cart: cartReducer,
  },
})
