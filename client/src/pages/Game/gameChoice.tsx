import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import GameCard from 'pages/Game/gameCard'

import { useModal } from 'actions/hooks/useModal'

export default function GameChoice(props: any) {
	const { nickname, phase, client, roomId } = props

	const table = useSelector((state: any) => state.table)
	const teller = useSelector((state: any) => state.teller)
	const tellerMsg = useSelector((state: any) => state.tellerMsg)

	const [setModalState, setModalMsg] = useModal('')
	const [isImteller, setIsImteller] = useState(false)
	const [choicedCard, setChoicedCard] = useState<any>({})

	useEffect(() => {
		if (teller === nickname) {
			setIsImteller(true)
		}
	}, [teller, nickname])

	const onSubmit = () => {
		if (isImteller) return
		if (!choicedCard) {
			setModalMsg('선택된 카드가 없습니다.')
			setModalState('alert')
			return
		}

		client.publish({
			destination: `/pub/room/${roomId}/choice`,
			body: JSON.stringify({
				nickname,
				cardId: choicedCard.cardId,
				cardUrl: choicedCard.cardUrl,
			}),
		})
	}

	return (
		<div>
			<div>
				{!isImteller && choicedCard.cardUrl ? (
					<GameCard phase={phase} cardUrl={choicedCard.cardUrl} />
				) : null}
				<span>{tellerMsg}</span>

				{!isImteller ? <button onClick={onSubmit}>제출하기</button> : null}

				{isImteller ? (
					<div>다른 사람들이 카드를 맞추는 중입니다.</div>
				) : (
					<div>작품설명으로 텔러의 그림을 맞춰주세요.</div>
				)}
			</div>

			<div>
				{table.map((card) => (
					<div key={card.cardId} onClick={() => setChoicedCard(card)}>
						<GameCard phase={phase} cardUrl={card.cardUrl} />
					</div>
				))}
			</div>
		</div>
	)
}
