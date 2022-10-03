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
	const { id, title, url, description, designer } = useSelector((state: any) => state.modalMsg)

	const [isMyPaint, setIsMyPaint] = useState(false)

	useEffect(() => {
		if (currentUser.nickname === designer.nickname) {
			setIsMyPaint(true)
		}
	}, [])

	const onCancel = () => {
		art.cancelRegist(id).then((result) => {
			console.log(result.data.response)
			if (result.data.response === '제출 해제 성공') {
				navigate('/vote')
				dispatch(setModalState(''))
			}
		})
	}

	const onVote = () => {
		const data = {
			nickname: currentUser.nickname,
			id,
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
			{title}
			<img src={url} alt="paintTitle" />
			{description}
			{'좋아요 변수명 정해지면 넣기'}
			by. {designer.nickname}
			<button onClick={() => dispatch(setModalState(''))}>돌아가기</button>
			{isMyPaint ? (
				<button onClick={onCancel}>출품 취소하기</button>
			) : (
				<button onClick={onVote}>추천하기</button>
			)}
		</div>
	)
}
