import { createSlice } from '@reduxjs/toolkit'

export const roomInfo = createSlice({
  name: 'roomInfo',
  initialState: {
    roomId: 1,
    roomName: 'test room',
    isLocked: false,
    peopleNum: 3,
    maxPeopleNum: 6,
    type: 0,
    typeNum: 10,
  },
  reducers: {
    setRoomInfo(state, action) {
      return action.payload
    },
  },
})
export const { setRoomInfo } = roomInfo.actions

export const chats = createSlice({
  name: 'chats',
  initialState: {
    currentRoomId: 0,
    chats: [
      {
        nickname: 'test',
        msg: 'testtesttest',
        time: '9/24/2022, 10:10:10 AM',
      },
    ],
  },
  reducers: {
    clearChat(state) {
      state.chats = []
    },
    setCurrentRoomId(state, action) {
      state.currentRoomId = action.payload
    },
    addChat(state, action) {
      state.chats.push(action.payload)
    },
  },
})
export const { clearChat, setCurrentRoomId, addChat } = chats.actions

export const players = createSlice({
  name: 'players',
  initialState: [
    {
      nickname: '민지',
      profile:
        'https://w.namu.la/s/cf689cab0bb0801a249f535dc7c008c0c054b82954d8f9cdca47b81363e68489a3c24c6dd3adf6664a9c260499bd6dcd132354c253673082c05310d00787cd1627999da116030d7f09cfeabb07d2bbbd2c4581baef341d6e49fd2581525c5e2d',
      ready: false,
      score: 0,
      nft: '',
    },
    {
      nickname: '도현',
      profile:
        'https://img.danawa.com/prod_img/500000/147/615/img/14615147_1.jpg?shrink=330:330&_v=20220426173016',
      ready: false,
      score: 0,
      nft: '',
    },
    {
      nickname: '보경',
      profile:
        'https://img.danawa.com/prod_img/500000/147/615/img/14615147_1.jpg?shrink=330:330&_v=20220426173016',
      ready: false,
      score: 0,
      nft: '',
    },
    {
      nickname: '현영',
      profile:
        'https://img.danawa.com/prod_img/500000/147/615/img/14615147_1.jpg?shrink=330:330&_v=20220426173016',
      ready: false,
      score: 0,
      nft: '',
    },
    {
      nickname: '석호',
      profile:
        'https://w.namu.la/s/cf689cab0bb0801a249f535dc7c008c0c054b82954d8f9cdca47b81363e68489a3c24c6dd3adf6664a9c260499bd6dcd132354c253673082c05310d00787cd1627999da116030d7f09cfeabb07d2bbbd2c4581baef341d6e49fd2581525c5e2d',
      ready: false,
      score: 0,
      nft: '',
    },
    {
      nickname: '수민',
      profile:
        'https://w.namu.la/s/cf689cab0bb0801a249f535dc7c008c0c054b82954d8f9cdca47b81363e68489a3c24c6dd3adf6664a9c260499bd6dcd132354c253673082c05310d00787cd1627999da116030d7f09cfeabb07d2bbbd2c4581baef341d6e49fd2581525c5e2d',
      ready: false,
      score: 0,
      nft: '',
    },
  ],
  reducers: {
    setPlayers(state, action) {
      return action.payload
    },
    addScore(state, action) {
      state.forEach((player: any) => {
        for (const p of action.payload) {
          if (player.nickname === p.nickname) {
            player.score += p.score
            break
          }
        }
      })
    },
  },
})
export const { setPlayers, addScore } = players.actions

export const time = createSlice({
  name: 'time',
  initialState: 0,
  reducers: {
    setTime(state, action) {
      return action.payload
    },
  },
})
export const { setTime } = time.actions

export const items = createSlice({
  name: 'items',
  initialState: [],
  reducers: {},
})

export const itemState = createSlice({
  name: 'itemState',
  initialState: [],
  reducers: {},
})

export const cards = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    setCards(state, action) {
      return action.payload
    },
    addCard(state, action) {
      state.push(action.payload)
    },
  },
})
export const { setCards, addCard } = cards.actions

export const description = createSlice({
  name: 'description',
  initialState: '',
  reducers: {
    setDescription(state, action) {
      return action.payload
    },
  },
})
export const { setDescription } = description.actions

export const table = createSlice({
  name: 'table',
  initialState: [],
  reducers: {
    setTable(state, action) {
      return action.payload
    },
  },
})
export const { setTable } = table.actions

export const endResult = createSlice({
  name: 'endResult',
  initialState: [],
  reducers: {
    setEndResult(state, action) {
      action.payload.sort((player) => -player.score)
      return action.payload
    },
  },
})
export const { setEndResult } = endResult.actions
