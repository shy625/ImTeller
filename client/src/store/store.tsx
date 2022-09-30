import { configureStore } from '@reduxjs/toolkit'

import { email, currentUser, userDetail, cardList } from 'store/modules/user'
import {
  isChecked,
  roomList,
  roomInfo,
  chats,
  players,
  time,
  items,
  itemState,
  gameCards,
  selectedCards,
  description,
  table,
  endResult,
} from 'store/modules/game'
import { paintList } from 'store/modules/art'
import {
  isBgmOn,
  bgmSrc,
  bgmVolume,
  isEffectOn,
  effectVolume,
  isMouseEffectOn,
  modalState,
  modalMsg,
  modalResult,
  myPageTab,
} from 'store/modules/util'

export default configureStore({
  reducer: {
    email: email.reducer,
    currentUser: currentUser.reducer,
    userDetail: userDetail.reducer,
    cardList: cardList.reducer,

    isChecked: isChecked.reducer,
    roomList: roomList.reducer,
    roomInfo: roomInfo.reducer,
    chats: chats.reducer,
    players: players.reducer,
    time: time.reducer,
    items: items.reducer,
    itemState: itemState.reducer,
    gameCards: gameCards.reducer,
    selectedCards: selectedCards.reducer,
    description: description.reducer,
    table: table.reducer,
    endResult: endResult.reducer,

    paintList: paintList.reducer,

    isBgmOn: isBgmOn.reducer,
    bgmSrc: bgmSrc.reducer,
    bgmVolume: bgmVolume.reducer,
    isEffectOn: isEffectOn.reducer,
    effectVolume: effectVolume.reducer,
    isMouseEffectOn: isMouseEffectOn.reducer,
    modalState: modalState.reducer,
    modalMsg: modalMsg.reducer,
    modalResult: modalResult.reducer,
    myPageTab: myPageTab.reducer,
  },
})
