import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { toast } from 'react-toastify'

//check if Tokyo Market Exchange is open
const isMarketOpen = () => {
  //first let's set the current date in UTC (clients may belong to different timezones)
  const currentUtcDate = moment.utc()

  //now check if current day is not a weekday
  const dayOfWeek = currentUtcDate.day()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false
  }

  //if we are in a day of the week now we can check the time of the day to see if market is open.
  //all dates are converted in UTC
  //Tokyo Market Exhange Open Time: 09:00 - 11:30 / 12:30 - 15:00 GMT+9

  //set the valid times
  const dateFormat = 'hh:mm:ss'
  const openTime1 = [
    moment.utc('00:00:00', dateFormat),
    moment.utc('02:30:00', dateFormat),
  ]
  const openTime2 = [
    moment.utc('03:30:00', dateFormat),
    moment.utc('06:00:00', dateFormat),
  ]

  //perform the time check
  if (
    currentUtcDate.isBetween(openTime1[0], openTime1[1]) ||
    currentUtcDate.isBetween(openTime2[0], openTime2[1])
  ) {
    return true
  }

  return false
}

const initialState = {
  isMarketOpen: isMarketOpen(),
  paymentProcessing: false,
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.paymentProcessing) return

      const index = state.value.findIndex(
        (val) => val.stock === action.payload.stock
      )
      if (index === -1) {
        state.value = [...state.value, { ...action.payload, id: uuidv4() }]
      } else {
        const newAmount = state.value[index].amount + action.payload.amount
        if (newAmount <= 1000) {
          state.value[index] = {
            ...state.value[index],
            amount: state.value[index].amount + action.payload.amount,
            value: state.value[index].value + action.payload.value,
          }
        } else {
          toast.error('Cannot purchase more than 1000 stocks per company.', {
            hideProgressBar: true,
            autoClose: 2000,
          })
        }
      }
    },
    removeFromCart: (state, action) => {
      if (state.paymentProcessing) return

      const newArray = state.value.filter((val) => val.id !== action.payload)
      state.value = [...newArray]
    },
    clearCart: (state) => {
      if (state.paymentProcessing) return
      state.value = initialState.value
    },
    toggleMarketStatus: (state) => {
      state.isMarketOpen = !state.isMarketOpen
    },
    setPaymentProcessing: (state, action) => {
      state.paymentProcessing = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleMarketStatus,
  setPaymentProcessing,
} = cartSlice.actions

export default cartSlice.reducer
