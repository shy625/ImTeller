import { createSlice } from '@reduxjs/toolkit'

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

export const isBgmOn = createSlice({
  name: 'isBgmOn',
  initialState: true,
  reducers: {
    setIsBgmOn(state, action) {
      return !action.payload
    },
  },
})
export const { setIsBgmOn } = isBgmOn.actions

export const bgmVolume = createSlice({
  name: 'bgmVolume',
  initialState: 50,
  reducers: {
    setBgmVolume(state, action) {
      return action.payload
    },
  },
})
export const { setBgmVolume } = bgmVolume.actions

export const isEffectOn = createSlice({
  name: 'isEffectOn',
  initialState: true,
  reducers: {
    setIsEffectOn(state, action) {
      return action.payload
    },
  },
})
export const { setIsEffectOn } = isEffectOn.actions

export const effectVolume = createSlice({
  name: 'effectVolume',
  initialState: 50,
  reducers: {
    setEffectVolume(state, action) {
      return action.payload
    },
  },
})
export const { setEffectVolume } = effectVolume.actions

export const isMouseEffectOn = createSlice({
  name: 'isMouseEffectOn',
  initialState: true,
  reducers: {
    setIsMouseEffectOn(state, action) {
      return action.payload
    },
  },
})
export const { setIsMouseEffectOn } = isMouseEffectOn.actions

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

export const myPageTab = createSlice({
  name: 'myPageTab',
  initialState: 0,
  reducers: {
    setMyPageTab(state, action) {
      return action.payload
    },
  },
})
export const { setMyPageTab } = myPageTab.actions
