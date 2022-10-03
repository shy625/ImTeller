/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import CardList from 'components/cardList'

import { setModalState, setModalMsg } from 'store/modules/util'
import { setVoteList } from 'store/modules/art'
import art from 'actions/api/art'
import vote from 'actions/api/vote'

export default function VoteRegisterModal(props: any) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const currentUser = useSelector((state: any) => state.currentUser)
	const paintList = useSelector((state: any) => state.paintList)
	const selectedPaint = useSelector((state: any) => state.selectedPaint)

	const onSubmit = () => {
		if (!selectedPaint) {
			dispatch(setModalMsg('선택된 작품이 없습니다.'))
			dispatch(setModalState('alert'))
			return
		}
		console.log(selectedPaint)
		art
			.paintRegist(selectedPaint)
			.then((result) => {
				console.log(result)
				if (result.data.response === '제출 성공') {
					vote.paintList().then((result) => {
						dispatch(setVoteList(result.data.response))
						console.log('업데이트까지 끝')
					})
					dispatch(setModalMsg('출품이 완료되었습니다.'))
					dispatch(setModalState('alert'))
					navigate('/vote')
				} else {
					dispatch(setModalMsg('등록에 실패했습니다.'))
					dispatch(setModalState('alert'))
					navigate('/vote')
				}
			})
			.catch((error) => {
				console.error(error)
				dispatch(setModalMsg('예기치 못한 이유로 출품에 실패했습니다.'))
				dispatch(setModalState('alert'))
				navigate('/vote')
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
