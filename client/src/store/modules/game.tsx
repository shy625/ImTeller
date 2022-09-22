import { createSlice } from '@reduxjs/toolkit'

export const timer = createSlice({
  name: 'timer',
  initialState: 0,
  reducers: {
    setTimer(state, action) {
      return action.payload
    },
    reduceTime(state) {
      if (state > 0) return state - 1
      return state
    },
  },
})
export const { setTimer, reduceTime } = timer.actions
