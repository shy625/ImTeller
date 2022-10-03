import { configureStore } from '@reduxjs/toolkit'

import { email, currentUser, userDetail, myPageTab } from 'store/modules/user'
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
	teller,
	tellerMsg,
	table,
	result,
} from 'store/modules/game'
import {
	cardList,
	paintList,
	selectedCard,
	selectedPaint,
	dealList,
	dealDetail,
	voteList,
} from 'store/modules/art'
import {
	bgmSrc,
	isBgmOn,
	bgmVolume,
	effectSrc,
	isEffectOn,
	effectVolume,
	isMouseEffectOn,
	modalState,
	modalMsg,
	modalResult,
	loading,
	rankTabNo,
} from 'store/modules/util'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
	reducer: {
		email: email.reducer,
		currentUser: currentUser.reducer,
		userDetail: userDetail.reducer,

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
		teller: teller.reducer,
		tellerMsg: tellerMsg.reducer,
		table: table.reducer,
		result: result.reducer,
		myPageTab: myPageTab.reducer,

		cardList: cardList.reducer,
		paintList: paintList.reducer,
		selectedCard: selectedCard.reducer,
		selectedPaint: selectedPaint.reducer,
		dealList: dealList.reducer,
		dealDetail: dealDetail.reducer,
		voteList: voteList.reducer,

		bgmSrc: bgmSrc.reducer,
		isBgmOn: isBgmOn.reducer,
		bgmVolume: bgmVolume.reducer,
		effectSrc: effectSrc.reducer,
		isEffectOn: isEffectOn.reducer,
		effectVolume: effectVolume.reducer,
		isMouseEffectOn: isMouseEffectOn.reducer,
		modalState: modalState.reducer,
		modalMsg: modalMsg.reducer,
		modalResult: modalResult.reducer,
		loading: loading.reducer,
		rankTabNo: rankTabNo.reducer,
	},
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
