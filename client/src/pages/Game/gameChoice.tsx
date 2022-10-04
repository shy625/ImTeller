import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import GameCard from 'pages/Game/gameCard'

import { setTime } from 'store/modules/game'
import { useModal } from 'actions/hooks/useModal'

export default function GameChoice(props: any) {
	const { nickname, client, roomId } = props
	const dispatch = useDispatch()

	const table = useSelector((state: any) => state.table)
	const teller = useSelector((state: any) => state.teller)
	const tellerMsg = useSelector((state: any) => state.tellerMsg)

	const [setModalState, setModalMsg] = useModal('')
	const [isImteller, setIsImteller] = useState(false)
	const [choicedCard, setChoicedCard] = useState<any>({})
	const [isSubmit, setIsSubmit] = useState(false)

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

		setIsSubmit(true)
		client.publish({
			destination: `/pub/room/${roomId}/choice`,
			body: JSON.stringify({
				nickname,
				cardId: choicedCard.cardId,
				cardUrl: choicedCard.cardUrl,
			}),
		})
		dispatch(setTime(0))
	}

	return (
		<div>
			<div>
				{!isImteller && choicedCard.cardUrl ? <GameCard cardUrl={choicedCard.cardUrl} /> : null}
				<span>{tellerMsg}</span>

				{isSubmit ? null : !isImteller ? <button onClick={onSubmit}>제출하기</button> : null}

				{isImteller ? (
					<div>다른 사람들이 카드를 맞추는 중입니다.</div>
				) : (
					<div>작품설명으로 텔러의 그림을 맞춰주세요.</div>
				)}
			</div>

			<div>
				{table.map((card) => (
					<div key={card.cardId} onClick={() => setChoicedCard(card)}>
						<GameCard cardUrl={card.cardUrl} />
					</div>
				))}
			</div>
		</div>
	)
}
