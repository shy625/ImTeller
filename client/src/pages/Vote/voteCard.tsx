import { useSelector } from 'react-redux'

import Layout from 'layout/layout'

import vote from 'actions/api/vote'
import { useModal } from 'actions/hooks/useModal'

export default function VoteCard(props: any) {
	const { id, title, url, description, designer, ownerNickname } = props.paint
	const currentUser = useSelector((state: any) => state.currentUser)
	const [setModalState, setModalMsg] = useModal('')

	const onClick = () => {
		setModalMsg(props.paint)
		setModalState('vote')
	}

	const onVote = () => {
		const data = {
			nickname: currentUser.nickname,
			paintId: id,
		}
		vote.vote(data).then((result) => {
			console.log(result)
		}) // 내용 온것 반영하기
	}

	return (
		<div>
			<div onClick={onClick}>
				<img src={url} />
				{title}
				{description}
				<div>좋아요수</div>
			</div>
			<button onClick={onVote}>추천하기</button>
		</div>
	)
}
