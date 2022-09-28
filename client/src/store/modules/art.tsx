import { createSlice } from '@reduxjs/toolkit'

import card1 from 'assets/image/card1.webp'
import card2 from 'assets/image/card4.webp'
export const paintList = createSlice({
  name: 'paintList',
  initialState: [
    {
      paintId: 1,
      paintTitle: '기본카드1',
      paintImageURL: card1,
      description: '기본카드1.',
    },
    {
      paintId: 2,
      paintTitle: '기본카드2',
      paintImageURL: card2,
      description: '기본카드2.',
    },
  ],
  reducers: {
    setPaintList(state, action) {
      return action.payload
    },
  },
})
export const { setPaintList } = paintList.actions
