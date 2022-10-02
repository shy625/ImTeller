import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import vote from 'actions/api/vote'
import art from 'actions/api/art'
import { setPaintList } from 'store/modules/art'
import { setModalState, setModalMsg, setModalResult } from 'store/modules/util'

export default function VoteModal(props: any) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const currentUser = useSelector((state: any) => state.currentUser)
	const paintList = useSelector((state: any) => state.paintList)
	const { paintId, paintTitle, paintImageURL, description } = useSelector(
		(state: any) => state.modalMsg,
	)

	const [isMyPaint, setIsMyPaint] = useState(false)

	useEffect(() => {
		art.paintList({ nickname: currentUser.nickname }).then((result) => {
			console.log(result)
			dispatch(setPaintList(result.data))
		})
	}, [])

	useEffect(() => {
		if (
			paintList.some((paint) => {
				if (paint.paintId === paintId) return true
			})
		) {
			setIsMyPaint(true)
		}
	}, [paintList])

	const onCancel = () => {
		art.cancelRegist(paintId).then((result) => {
			console.log(result.data)
			navigate('/vote')
		})
	}

	const onVote = () => {
		const data = {
			nickname: currentUser.nickname,
			paintId,
		}
		vote
			.vote(data)
			.then((result) => {
				console.log(result)
				// 내용 온것 반영하기
				dispatch(setModalState(''))
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div>
			{paintTitle}
			<img src={paintImageURL} alt="paintTitle" />
			{description}
			{'좋아요 변수명 정해지면 넣기'}
			by. {'제작자 이름'}
			<button onClick={() => dispatch(setModalState(''))}>돌아가기</button>
			{isMyPaint ? (
				<button onClick={onCancel}>출품 취소하기</button>
			) : (
				<button onClick={onVote}>추천하기</button>
			)}
		</div>
	)
}
