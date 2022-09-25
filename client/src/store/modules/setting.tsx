import { createSlice } from '@reduxjs/toolkit'

export const isBgmOn = createSlice({
  name: 'isBgmOn',
  initialState: true,
  reducers: {
    setIsBgmOn(state, action) {
      return !state
    },
  },
})
export const { setIsBgmOn } = isBgmOn.actions

export const bgmSrc = createSlice({
  name: 'bgmSrc',
  initialState: 'assets/audio/bgm.mp3',
  reducers: {
    setBgmSrc(state, action) {
      return action.payload
    },
  },
})
export const { setBgmSrc } = bgmSrc.actions

export const volume = createSlice({
  name: 'volume',
  initialState: 50,
  reducers: {
    setVolume(state, action) {
      return action.payload
    },
  },
})
export const { setVolume } = volume.actions
