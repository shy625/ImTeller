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
      const copy = { ...state }
      copy.wallet = action.payload
      return copy
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

export const cardList = createSlice({
  name: 'cardList',
  initialState: [],
  reducers: {
    setCardList(state, action) {
      return action.payload
    },
  },
})
export const { setCardList } = cardList.actions
