import { useSelector, useDispatch } from 'react-redux'

import Layout from 'layout/layout'

import vote from 'actions/api/vote'
import art from 'actions/api/art'
import { setVoteList } from 'store/modules/art'

import { useModal } from 'actions/hooks/useModal'
import axios from 'axios'

export default function VoteCard(props: any) {
	const dispatch = useDispatch()
	const { vote, like } = props.paint
	const currentUser = useSelector((state: any) => state.currentUser)
	const [setModalState, setModalMsg] = useModal('')

	const onClick = () => {
		setModalMsg(props.paint)
		setModalState('vote')
	}

	const onVote = () => {
		// const data = {
		// 	userNickname: currentUser.nickname,
		// 	artId: id,
		// }
		vote
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
				vote.paintList().then((result) => {
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
				<div>좋아요수{vote.art.count}</div>
			</div>
			<button onClick={onVote}>추천하기</button>
			{vote.art.owner.nickname === currentUser.nickname ? (
				<button onClick={cancelRegiser}>출품 취소하기</button>
			) : null}
		</div>
	)
}
