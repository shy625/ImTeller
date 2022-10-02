import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import Card from 'components/card'

import { setModalState } from 'store/modules/util'
import { setSelectedCard } from 'store/modules/art'

export default function VoteRegisterModal(props: any) {
	const dispatch = useDispatch()

	const cardList = useSelector((state: any) => state.cardList)

	const onSelect = (card) => {
		dispatch(setSelectedCard(card))
		dispatch(setModalState(''))
	}

	return (
		<div>
			<div>
				{cardList.length ? (
					cardList.map((card) => (
						<div onClick={() => onSelect(card)} key={card.cardId}>
							<Card card={card} type={0} />
						</div>
					))
				) : (
					<p>소유중인 카드가 없습니다</p>
				)}
			</div>
			<button onClick={() => dispatch(setModalState(''))}>취소</button>
		</div>
	)
}
