import { createSlice } from '@reduxjs/toolkit'

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
