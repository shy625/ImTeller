/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

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
			<main css={voteCSS}>
				<div>
					<h2>당신의 카드에 투표하세요!</h2>
					<div>
						한달(일주일)에 한 작품씩 추천을 가장 많이 작품은 무료로 NFT로 변환해 드립니다. 하루에
						한번, 가장 매력적인 카드에 투표해 주세요
					</div>
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
const voteCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'GmarketSansMedium';

	h2 {
		color: white;
		font-family: 'GongGothicMedium';
	}
`
