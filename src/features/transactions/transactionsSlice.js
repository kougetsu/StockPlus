import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  value: [],
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.value = [...state.value, { ...action.payload, id: uuidv4() }]
    },
  },
})

export const { addTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer
