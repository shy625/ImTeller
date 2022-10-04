import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import GameCard from 'pages/Game/gameCard'
import { useBGM } from 'actions/hooks/useBGM'

export default function GameResult(props: any) {
	const dispatch = useDispatch()
	const { turnResult, submitCards, choiceCards } = props

	const table = useSelector((state: any) => state.table)
	useBGM('result')

	// 카드 주인하고 table에 있던 카드가 매칭되어 누가 주인이였는지 알게 해야함
	// 추가된 점수를 알 수 있도록 해야함

	const cardOwner = (cardId) => {
		let nickname
		let isTeller = false
		submitCards.map((subCard: any) => {
			if (cardId === subCard.cardId) {
				nickname = subCard.nickname
				isTeller = subCard.isTeller
			}
		})
		return (
			<div style={isTeller ? { backgroundColor: 'red' } : null}>
				{nickname} +{turnResult[nickname]}
			</div>
		)
	}

	const bets = (cardId) => {
		let result = []
		for (let nickname in choiceCards) {
			if (choiceCards[nickname] === cardId) {
				result.push(nickname)
			}
		}
		return (
			<div>
				{result.map((player) => (
					<div key={player}>
						<p>{player}</p>
					</div>
				))}
			</div>
		)
	}

	return (
		<div>
			{table.map((card) => (
				<div key={card.cardId}>
					{/* 카드 주인 */}
					<>{cardOwner(card.cardId)}</>
					<GameCard cardUrl={card.cardUrl} />
					{/* 누가 배팅했었는지, 얻는 점수와 함께 */}
					<>{bets(card.cardId)}</>
				</div>
			))}
		</div>
	)
}
