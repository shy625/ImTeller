import { createSlice } from '@reduxjs/toolkit'

export const paintList = createSlice({
  name: 'paintList',
  initialState: [],
  reducers: {
    setPaintList(state, action) {
      return action.payload
    },
  },
})
export const { setPaintList } = paintList.actions
