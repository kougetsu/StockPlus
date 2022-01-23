import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const accountBalanceSlice = createSlice({
  name: 'accountBalance',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload
    },
    setAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { incrementByAmount, decrementByAmount, setAmount } =
  accountBalanceSlice.actions

export default accountBalanceSlice.reducer
