/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { css } from '@emotion/react'
import { normalBtn } from 'style/commonStyle'

import Layout from 'layout/layout'
import VoteCard from 'pages/Vote/voteCard'

import vote from 'actions/api/vote'
import art from 'actions/api/art'
import { useModal } from 'actions/hooks/useModal'
import { setVoteList, setPaintList } from 'store/modules/art'

export default function Vote() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const voteList = useSelector((state: any) => state.voteList)
	const currentUser = useSelector((state: any) => state.currentUser)
	const [setModalState, setModalMsg] = useModal('')

	useEffect(() => {
		vote.paintList().then((result) => {
			console.log(result.data.response)
			dispatch(setVoteList(result.data.response))
		})
		art.paintList({ nickname: currentUser.nickname }).then((result) => {
			console.log(result)
			dispatch(setPaintList(result.data.response))
		})
	}, [])

	return (
		<Layout>
			<main css={voteCSS}>
				<div className="voteIntro">
					<div className="headline">당신의 카드에 투표하세요!</div>
					<div>
						한 달에 한 작품씩 가장 많이 추천받은 작품을 무료로 NFT로 변환해 드립니다. <br></br>
						하루에 한 번, 가장 매력적인 카드에 투표해 주세요
					</div>
					<div>
						<button css={normalBtn} onClick={() => navigate('/rank')}>
							지난 투표 결과 확인
						</button>
						<button css={normalBtn} onClick={() => setModalState('voteRegister')}>
							나도 출품하기
						</button>
					</div>
				</div>
				<div>
					{voteList.length
						? voteList
								.filter((paint) => paint.isVote !== 2)
								.map((paint) => <VoteCard paint={paint} key={paint.id} />)
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
	.voteIntro {
		width: 80%;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		text-align: center;
	}
	.headline {
		font-size: 25px;
		color: white;
		font-family: 'GongGothicMedium';
		margin: 20px 10px 10px 10px;
	}
	button {
		margin: 15px 10px 20px 10px;
	}
`
