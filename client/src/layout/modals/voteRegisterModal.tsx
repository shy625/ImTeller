import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import CardList from 'components/cardList'

import { setModalState, setModalMsg } from 'store/modules/util'
import art from 'actions/api/art'

export default function VoteRegisterModal(props: any) {
	const dispatch = useDispatch()

	const paintList = useSelector((state: any) => state.paintList)
	const selectedPaint = useSelector((state: any) => state.selectedPaint)

	const onSubmit = () => {
		if (!selectedPaint) {
			dispatch(setModalMsg('선택된 작품이 없습니다.'))
			dispatch(setModalState('alert'))
			return
		}

		art
			.paintRegist(selectedPaint)
			.then((result) => {
				console.log(result)
				if (result.data.response === '제출 성공') {
					dispatch(setModalMsg('출품이 완료되었습니다.'))
					dispatch(setModalState('alert'))
				} else {
					dispatch(setModalMsg('등록에 실패했습니다.'))
					dispatch(setModalState('alert'))
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<div>
			<div>
				<CardList cardList={paintList} isCard={false} type={1} />
			</div>
			<button onClick={() => dispatch(setModalState(''))}>취소</button>
			<button onClick={onSubmit}>출품</button>
		</div>
	)
}
