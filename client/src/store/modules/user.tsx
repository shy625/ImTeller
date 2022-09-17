import { createSlice } from '@reduxjs/toolkit'

export const currentUser = createSlice({
  name: 'currentUser',
  initialState: {
    userId: NaN,
    nickname: '',
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
