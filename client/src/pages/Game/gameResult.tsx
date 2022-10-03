import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import GameCard from 'pages/Game/gameCard'
import { players } from 'store/modules/game'

export default function GameResult(props: any) {
	const dispatch = useDispatch()
	const { phase, turnResult, submitCards } = props

	const table = useSelector((state: any) => state.table)

	// 카드 주인하고 table에 있던 카드가 매칭되어 누가 주인이였는지 알게 해야함
	// 추가된 점수를 알 수 있도록 해야함

	const players = () => {}

	return (
		<div>
			{table.map((card) => (
				<div key={card.id}>
					<GameCard phase={phase} cardUrl={card.url} players={players()} />
					{/* 여기에 누가 배팅했었는지, 얻는 점수와 함께 */}
				</div>
			))}
		</div>
	)
}
