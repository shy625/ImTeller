import { configureStore } from '@reduxjs/toolkit'

import { email, currentUser, userDetail, cardList } from 'store/modules/user'
import {
  roomList,
  roomInfo,
  chats,
  players,
  time,
  items,
  itemState,
  cards,
  selectedCards,
  description,
  table,
  endResult,
} from 'store/modules/game'
import { paintList } from 'store/modules/art'
import {
  isBgmOn,
  bgmSrc,
  volume,
  soundEffect,
  modalState,
  modalMsg,
  modalResult,
} from 'store/modules/setting'

export default configureStore({
  reducer: {
    email: email.reducer,
    currentUser: currentUser.reducer,
    userDetail: userDetail.reducer,
    cardList: cardList.reducer,

    roomList: roomList.reducer,
    roomInfo: roomInfo.reducer,
    chats: chats.reducer,
    players: players.reducer,
    time: time.reducer,
    items: items.reducer,
    itemState: itemState.reducer,
    cards: cards.reducer,
    selectedCards: selectedCards.reducer,
    description: description.reducer,
    table: table.reducer,
    endResult: endResult.reducer,

    paintList: paintList.reducer,

    isBgmOn: isBgmOn.reducer,
    bgmSrc: bgmSrc.reducer,
    volume: volume.reducer,
    soundEffect: soundEffect.reducer,
    modalState: modalState.reducer,
    modalMsg: modalMsg.reducer,
    modalResult: modalResult.reducer,
  },
})
