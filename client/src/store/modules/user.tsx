import { createSlice } from '@reduxjs/toolkit'

export const currentUser = createSlice({
  name: 'currentUser',
  initialState: {
    nickname: 'test',
    profile: '',
    exp: 0,
    win: 0,
    lose: 0,
    wallet: '',
    createdDT: undefined,
    updatedDT: undefined,
  },
  reducers: {
    setCurrentUser(state, action) {
      return action.payload
    },
    setWallet(state, action) {
      const copy = { ...state }
      copy.wallet = action.payload
      return copy
    },
  },
})
export const { setCurrentUser, setWallet } = currentUser.actions

export const userDetail = createSlice({
  name: 'userDetail',
  initialState: {
    nickname: 'test',
    profile:
      'https://w.namu.la/s/6f490388edd0eb0595b633808b7f9d4a4251ef5f33052b34a8f104a7b872676191869533df4148d6b540c5191c3651c6e492c4cb1502b8f1a62ba16a194f75b830f2e42d3496fe77d8c553746be4b71e2bd3ef4a8dc3b80783f89ac227c426c0f741a78c04644728cc49aaa5dc0b9143',
    exp: 1000,
    win: 1,
    lose: 1,
    createdDT: undefined,
    updatedDT: undefined,
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
