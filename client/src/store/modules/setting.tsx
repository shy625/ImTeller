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
  initialState: 'assets/audio/mainBgm.mp3',
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

export const soundEffect = createSlice({
  name: 'soundEffect',
  initialState: true,
  reducers: {
    setSoundEffect(state, action) {
      return !state
    },
  },
})
export const { setSoundEffect } = soundEffect.actions

export const modalState = createSlice({
  name: 'modalState',
  initialState: '',
  reducers: {
    setModalState(state, action) {
      return action.payload
    },
  },
})
export const { setModalState } = modalState.actions

export const modalMsg = createSlice({
  name: 'modalMsg',
  initialState: true,
  reducers: {
    setModalMsg(state, action) {
      return action.payload
    },
  },
})
export const { setModalMsg } = modalMsg.actions

export const modalResult = createSlice({
  name: 'modalResult',
  initialState: false,
  reducers: {
    setModalResult(state, action) {
      return action.payload
    },
  },
})
export const { setModalResult } = modalResult.actions

export let myPageTab = createSlice({
  name: 'myPageTab',
  initialState: 0,
  reducers: {
    setMyPageTab(state, action) {
      return action.payload
    },
  },
})
export const { setMyPageTab } = myPageTab.actions
