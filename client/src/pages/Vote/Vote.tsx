import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from 'layout/layout'
import VoteCard from 'pages/Vote/voteCard'

import vote from 'actions/api/vote'
import { useModal } from 'actions/hooks/useModal'
import { setVoteList } from 'store/modules/art'

export default function Vote() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const voteList = useSelector((state: any) => state.voteList)
	const [setModalState, setModalMsg] = useModal('')

	useEffect(() => {
		vote.paintList().then((result) => {
			console.log(result.data.response)
			dispatch(setVoteList(result.data.response))
		})
	}, [])

	return (
		<Layout>
			<main>
				<div>
					당신의 카드에 투표하세요!
					<button onClick={() => navigate('/rank')}>지난 투표 결과 확인</button>
					<button onClick={() => setModalState('voteRegister')}>나도 출품하기</button>
				</div>
				<div>
					{voteList.length
						? voteList.map((paint) => <VoteCard paint={paint} key={paint.id} />)
						: null}
				</div>
			</main>
		</Layout>
	)
}
