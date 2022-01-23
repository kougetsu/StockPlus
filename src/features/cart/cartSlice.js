import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

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
    toggleMarketStatus: (state) => {
      state.isMarketOpen = !state.isMarketOpen
    },
  },
})

export const { addToCart, removeFromCart, clearCart, toggleMarketStatus } =
  cartSlice.actions

export default cartSlice.reducer
