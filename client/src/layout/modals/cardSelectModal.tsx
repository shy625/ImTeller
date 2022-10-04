/** @jsxImportSource @emotion/react */

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import CardList from 'components/cardList'

import { setModalState } from 'store/modules/util'

export default function CardSelectModal(props: any) {
	const dispatch = useDispatch()
	const cardList = useSelector((state: any) => state.cardList)

	return (
		<div>
			<div>
				<CardList cardList={cardList} isCard={true} type={1} />
			</div>
			<button onClick={() => dispatch(setModalState(''))}>확인</button>
		</div>
	)
}
