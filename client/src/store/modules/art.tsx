import { createSlice } from '@reduxjs/toolkit'

import card1 from 'assets/image/card1.webp'
import card2 from 'assets/image/card4.webp'
import card3 from 'assets/image/card11.webp'
import card4 from 'assets/image/card22.webp'
import card5 from 'assets/image/card31.webp'
import card6 from 'assets/image/card36.webp'
import card7 from 'assets/image/card55.webp'

export const cardList = createSlice({
	name: 'cardList',
	initialState: [
		{
			cardId: 1,
			cardTitle: '기본카드1',
			cardImageURL: card1,
			description: '기본카드1.',
			grade: 'B',
			effect: 4,
			effectNum: 0,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
		{
			cardId: 2,
			cardTitle: '기본카드2',
			cardImageURL: card2,
			description: '기본카드2.',
			grade: 'S',
			effect: 1,
			effectNum: 10,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
		{
			cardId: 3,
			cardTitle: '기본카드3',
			cardImageURL: card3,
			description: '기본카드3.',
			grade: 'S',
			effect: 2,
			effectNum: 60,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
		{
			cardId: 4,
			cardTitle: '기본카드4',
			cardImageURL: card4,
			description: '기본카드4.',
			grade: 'S',
			effect: 3,
			effectNum: 0,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
		{
			cardId: 5,
			cardTitle: '기본카드5',
			cardImageURL: card5,
			description: '기본카드5.',
			grade: 'S',
			effect: 4,
			effectNum: 3,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
		{
			cardId: 6,
			cardTitle: '기본카드6',
			cardImageURL: card6,
			description: '기본카드6.',
			grade: 'S',
			effect: 5,
			effectNum: 2.5,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
		{
			cardId: 7,
			cardTitle: '기본카드7',
			cardImageURL: card7,
			description: '기본카드7.',
			grade: 'A',
			effect: 6,
			effectNum: 0,
			createdDT: 'asdf',
			recentPrice: 100,
			tokenId: 1,
		},
	],
	reducers: {
		setCardList(state, action) {
			return action.payload
		},
	},
})
export const { setCardList } = cardList.actions

export const paintList = createSlice({
	name: 'paintList',
	initialState: [
		{
			paintId: 1,
			paintTitle: '기본카드1',
			paintImageURL: card1,
			description: '기본카드1.',
			isVote: false,
		},
		{
			paintId: 2,
			paintTitle: '기본카드2',
			paintImageURL: card2,
			description: '기본카드2.',
			isVote: false,
		},
	],
	reducers: {
		setPaintList(state, action) {
			return action.payload
		},
	},
})
export const { setPaintList } = paintList.actions

export const selectedCard = createSlice({
	name: 'selectedCard',
	initialState: {} as any,
	reducers: {
		setSelectedCard(state, action) {
			console.log('setSelectedCard', setSelectedCard)

			return action.payload
		},
	},
})
export const { setSelectedCard } = selectedCard.actions

export const selectedPaint = createSlice({
	name: 'selectedPaint',
	initialState: 0,
	reducers: {
		setSelectedPaint(state, action) {
			return action.payload
		},
	},
})
export const { setSelectedPaint } = selectedPaint.actions

export const dealList = createSlice({
	name: 'dealList',
	initialState: [
		{
			cardId: '1',
			cardImageURL: card1,
			dealId: 1,
			designerId: 1,
			description: '기본그림1',
			designerNickname: 'test',
			finalBidPrice: 700,
			finishedAt: '2022-09-28 16:04:30',
			instantPrice: 1000,
			effect: 1,
			grade: 'S',
			tag: 'tag',
		},
		{
			cardId: '1',
			cardImageURL: card2,
			dealId: 2,
			designerId: 2,
			description: '기본그림2',
			designerNickname: 'testtest',
			finalBidPrice: 800,
			finishedAt: '2022-09-28 16:04:30',
			instantPrice: 1500,
			effect: 1,
			grade: 'A',
			tag: 'tag',
		},
	],
	reducers: {
		setDealList(state, action) {
			return action.payload
		},
	},
})
export const { setDealList } = dealList.actions

export const dealDetail = createSlice({
	name: 'dealDetail',
	initialState: {
		cardInfo: {
			cardId: 1,
			cardImageURL: 'test',
			cardTitle: 'test',
			createdAt: '2022-10-03T16:01:40',
			description: 'test1',
			designerId: 2,
			designerNickname: 'shy',
			effect: 1,
			effectNum: 10,
			grade: 'S',
			ownerId: 2,
			ownerNickname: 'MoCCo',
			tokenId: 1,
		},
		dealHistoryList: [
			{
				sellerId: 1,
				sellerNickname: 'IMTELLER',
				buyerId: 2,
				buyerNickname: 'MoCCo',
				price: 1000,
				dealedAt: '2022-09-30 05:21:07',
			},
		],
		dealInfo: {
			dealId: 1,
			finalBidPrice: 100,
			finishedAt: '2022-10-20 05:21:07',
			instantPrice: 1000,
			lowPrice: 50,
			dealAddress: '0xasdfasdfasdfasdfasdf',
		},
	},
	reducers: {
		setDealDetail(state, action) {
			return action.payload
		},
	},
})
export const { setDealDetail } = dealDetail.actions
