/** @jsxImportSource @emotion/react */
import { useSelector, useDispatch } from 'react-redux'

import { css } from '@emotion/react'
import Layout from 'layout/layout'

import voteApi from 'actions/api/vote'
import art from 'actions/api/art'
import { setVoteList } from 'store/modules/art'
import { voteListProps } from './Vote'
import { useModal } from 'actions/hooks/useModal'
import axios from 'axios'

export default function VoteCard({ paint }: { paint: voteListProps }) {
	const dispatch = useDispatch()
	const { vote, like } = paint
	const currentUser = useSelector((state: any) => state.currentUser)
	const [setModalState, setModalMsg] = useModal('')

	const onClick = () => {
		setModalMsg(vote)
		setModalState('vote')
	}

	const onVote = () => {
		// const data = {
		// 	userNickname: currentUser.nickname,
		// 	artId: id,
		// }
		voteApi
			.vote({
				userNickname: currentUser.nickname,
				artId: vote.art.id,
			})
			.then((result) => {
				console.log(result)
			})
	}
	const cancelRegiser = () => {
		art
			.cancelRegist(vote.art.id)
			.then((result) => {
				voteApi.paintList().then((result) => {
					dispatch(setVoteList(result.data.response))
					console.log(result)
					console.log('업데이트까지 끝')
				})
				setModalMsg('출품이 성공적으로 취소되었습니다.')
				setModalState('alert')
				console.log('출품 취소 성공')
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<div>
			<div onClick={onClick}>
				<img src={vote.art.url} alt="그림" />
				{vote.art.title}
				{vote.art.description}
				<div>좋아요수{vote.count}</div>
			</div>
			<button onClick={onVote}>추천하기</button>
			{vote.art.owner.nickname === currentUser.nickname ? (
				<button onClick={cancelRegiser}>출품 취소하기</button>
			) : null}
		</div>
	)
}
