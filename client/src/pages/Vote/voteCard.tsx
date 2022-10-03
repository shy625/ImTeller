import { useSelector, useDispatch } from 'react-redux'

import Layout from 'layout/layout'

import vote from 'actions/api/vote'
import art from 'actions/api/art'
import { setVoteList } from 'store/modules/art'

import { useModal } from 'actions/hooks/useModal'

export default function VoteCard(props: any) {
	const dispatch = useDispatch()
	const { id, title, url, description, ownerNickname } = props.paint
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
				artId: id,
			})
			.then((result) => {
				console.log(result)
			})
	}
	const cancelRegiser = () => {
		art
			.cancelRegist(id)
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
				<img src={url} alt="그림" />
				{title}
				{description}
				<div>좋아요수</div>
			</div>
			<button onClick={onVote}>추천하기</button>
			{ownerNickname === currentUser.nickname ? (
				<button onClick={cancelRegiser}>출품 취소하기</button>
			) : null}
		</div>
	)
}
