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

export const dealList = createSlice({
  name: 'dealList',
  initialState: [
    {
      dealId: 1,
      instantPrice: 1000,
      finalBidPrice: 700,
      tag: ['맛집', '역삼'],
      finishedAt: '2022-09-28T16:04:30',
      cardId: '1',
      cardImageURL: card1,
      designerId: 'tester',
      description: '기본그림1',
      designerNickname: 'test',
      grade: 'S',
      effect: 1,
    },
    {
      dealId: 2,
      instantPrice: 1500,
      finalBidPrice: 200,
      tag: '#맛집 #역삼',
      finishedAt: '2022-09-28T16:04:30',
      cardId: '2',
      cardImageURL: card2,
      designerId: 'testerasdf',
      description: '기본그림2',
      designerNickname: 'testtets',
      grade: 'A',
      effect: 4,
    },
  ],
  reducers: {
    setDealList(state, action) {
      return action.payload
    },
  },
})
export const { setDealList } = dealList.actions

export const dealDetail = createSlice({
  name: 'dealDetail',
  initialState: {},
  reducers: {
    setDealDetail(state, action) {
      return action.payload
    },
  },
})
export const { setDealDetail } = dealDetail.actions
