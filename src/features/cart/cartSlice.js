import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value = [...state.value, { ...action.payload, id: uuidv4() }]
    },
    removeFromCart: (state, action) => {
      const newArray = state.value.filter((val) => val.id !== action.payload)
      state.value = [...newArray]
    },
    clearCart: (state) => {
      state.value = initialState.value
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
