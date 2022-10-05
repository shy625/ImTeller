import { useDispatch, useSelector } from 'react-redux'

import GameCard from 'pages/Game/gameCard'
import Item from 'components/item'
import { useBGM } from 'actions/hooks/useBGM'

export default function GameResult(props: any) {
	const dispatch = useDispatch()
	const { turnResult, submitCards, choiceCards } = props

	const table = useSelector((state: any) => state.table)
	const itemState = useSelector((state: any) => state.itemState)

	useBGM('result')

	const itemUse = (nickname) => {
		const use = []
		itemState.map((item) => {
			if (item.nickname === nickname) {
				use.push(<Item key={item.cardId} item={item} style={{ width: '30px' }} />)
			}
		})
		console.log(use)
		return use
	}

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
				{nickname} +{turnResult[nickname]} {itemUse(nickname)}
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
