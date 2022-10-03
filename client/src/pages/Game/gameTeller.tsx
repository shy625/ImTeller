import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Items from 'pages/Game/items'
import GameCard from 'pages/Game/gameCard'

import { useModal } from 'actions/hooks/useModal'
import { setDescription } from 'store/modules/game'

export default function GameTeller(props: any) {
	// 본인카드 나열, teller면 본인카드랑 그림 묘사 적어서 제출
	// teller 아니면 그림묘사어 생길때까지 기다리다가 선택해서 제출
	const dispatch = useDispatch()
	const { nickname, phase, client, roomId } = props

	const gameCards = useSelector((state: any) => state.gameCards)
	const teller = useSelector((state: any) => state.teller)
	const description = useSelector((state: any) => state.discription)

	const [setModalState, setModalMsg] = useModal('')
	const [isImteller, setIsImteller] = useState(false)
	const [tellerCard, setTellerCard] = useState<any>({})

	useEffect(() => {
		if (teller === nickname) {
			setIsImteller(true)
		} else {
			setIsImteller(false)
		}
	}, [teller, nickname])

	// phase 1에선 텔러만 카드 선택 및 묘사어 적기 다른 인원은 그냥 본인 카드만 보이게
	// phase 2에선 텔러는 그냥 구경하기, 다른 인원은 본인 카드에서 낚시 카드 선택하기

	const onSubmit = () => {
		if (!tellerCard) {
			setModalMsg('선택된 카드가 없습니다.')
			setModalState('alert')
			return
		}

		if (isImteller) {
			client.publish({
				destination: `/pub/room/${roomId}/teller`,
				body: JSON.stringify({
					nickname,
					cardId: tellerCard.id,
					cardUrl: tellerCard.url,
					cardMsg: description,
				}),
			})
			return
		}
		client.publish({
			destination: `/pub/room/${roomId}/other`,
			body: JSON.stringify({
				nickname,
				cardId: tellerCard.id,
				cardUrl: tellerCard.url,
			}),
		})
	}

	return (
		<div>
			<div>
				{(phase === 1 && isImteller) || (phase === 2 && !isImteller) ? (
					<>
						{tellerCard ? (
							<div>
								<img src={tellerCard.url} alt="" />
							</div>
						) : null}
					</>
				) : null}

				{isImteller && phase === 1 ? (
					<div>
						<label htmlFor="description"></label>
						<input
							id="description"
							type="text"
							onChange={(e) => dispatch(setDescription(e.target.value))}
						/>
					</div>
				) : (
					<span>{description}</span>
				)}

				{(phase === 1 && isImteller) || (phase === 2 && !isImteller) ? (
					<button onClick={onSubmit}>제출하기</button>
				) : null}

				{isImteller && phase === 1 ? (
					<div>당신은 텔러입니다. 한장의 카드를 고르고 작품설명을 적어주세요</div>
				) : phase === 1 ? (
					<div>텔러가 카드를 선택중입니다.</div>
				) : !isImteller ? (
					<div>텔러의 작품설명과 비슷한 카드를 골라주세요</div>
				) : null}
			</div>

			<div>
				{gameCards.map((card) => (
					<div key={card.id} onClick={() => setTellerCard(card)}>
						<GameCard phase={phase} cardUrl={card.url} />
					</div>
				))}
			</div>

			<div>
				<Items />
			</div>
		</div>
	)
}
