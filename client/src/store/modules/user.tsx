import { createSlice } from '@reduxjs/toolkit'

export const email = createSlice({
  name: 'email',
  initialState: '',
  reducers: {
    setEmail(state, action) {
      return action.payload
    },
  },
})
export const { setEmail } = email.actions

export const currentUser = createSlice({
  name: 'currentUser',
  initialState: {
    nickname: '',
    profile: '',
    exp: 0,
    win: 0,
    lose: 0,
    wallet: '',
    createdDT: undefined,
  },
  reducers: {
    setCurrentUser(state, action) {
      return action.payload
    },
    setLogout(state) {
      return {
        nickname: '',
        profile: '',
        exp: 0,
        win: 0,
        lose: 0,
        wallet: '',
        createdDT: undefined,
      }
    },
    setWallet(state, action) {
      state.wallet = action.payload
    },
  },
})
export const { setCurrentUser, setLogout, setWallet } = currentUser.actions

export const userDetail = createSlice({
  name: 'userDetail',
  initialState: {
    nickname: '',
    profile: '',
    exp: 0,
    win: 0,
    lose: 0,
    createdDT: undefined,
    cardList: [
      {
        cardTitle: 'testcard',
        cardImageURL: '',
        content: 'testtesttest',
      },
    ],
  },
  reducers: {
    setUserDetail(state, action) {
      return action.payload
    },
  },
})
export const { setUserDetail } = userDetail.actions

import card1 from 'assets/image/card1.webp'
import card2 from 'assets/image/card4.webp'
import card3 from 'assets/image/card11.webp'
import card4 from 'assets/image/card22.webp'
import card5 from 'assets/image/card31.webp'
import card6 from 'assets/image/card36.webp'
import card7 from 'assets/image/card55.webp'

export const cardList = createSlice({
  name: 'cardList',
  initialState: [
    {
      cardId: 1,
      cardTitle: '기본카드1',
      cardImageURL: card1,
      description: '기본카드1.',
      grade: '',
      effect: 0,
      effectDetail: 0,
      createdDT: 'asdf',
      recentPrice: 100,
    },
    {
      cardId: 2,
      cardTitle: '기본카드2',
      cardImageURL: card2,
      description: '기본카드2.',
      grade: 'S',
      effect: 1,
      effectDetail: 10,
      createdDT: 'asdf',
      recentPrice: 100,
    },
    {
      cardId: 3,
      cardTitle: '기본카드3',
      cardImageURL: card3,
      description: '기본카드3.',
      grade: 'S',
      effect: 2,
      effectDetail: 60,
      createdDT: 'asdf',
      recentPrice: 100,
    },
    {
      cardId: 4,
      cardTitle: '기본카드4',
      cardImageURL: card4,
      description: '기본카드4.',
      grade: 'S',
      effect: 3,
      effectDetail: 0,
      createdDT: 'asdf',
      recentPrice: 100,
    },
    {
      cardId: 5,
      cardTitle: '기본카드5',
      cardImageURL: card5,
      description: '기본카드5.',
      grade: 'S',
      effect: 4,
      effectDetail: 3,
      createdDT: 'asdf',
      recentPrice: 100,
    },
    {
      cardId: 6,
      cardTitle: '기본카드6',
      cardImageURL: card6,
      description: '기본카드6.',
      grade: 'S',
      effect: 5,
      effectDetail: 2.5,
      createdDT: 'asdf',
      recentPrice: 100,
    },
    {
      cardId: 7,
      cardTitle: '기본카드7',
      cardImageURL: card7,
      description: '기본카드7.',
      grade: 'A',
      effect: 6,
      effectDetail: 0,
      createdDT: 'asdf',
      recentPrice: 100,
    },
  ],
  reducers: {
    setCardList(state, action) {
      return action.payload
    },
  },
})
export const { setCardList } = cardList.actions
