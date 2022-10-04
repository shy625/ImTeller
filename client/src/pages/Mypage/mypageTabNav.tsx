/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setMyPageTab } from 'store/modules/user'
import { css } from '@emotion/react'

export default function MypageTabNav(props: any) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { isMyMypage } = props

	return (
		<div css={centerCSS}>
			<div css={myPageNavCSS}>
				<div className="myPageLine">
					<div
						onClick={() => {
							dispatch(setMyPageTab(0))
						}}
					>
						NFT 카드
					</div>
					{isMyMypage ? (
						<div
							onClick={() => {
								dispatch(setMyPageTab(1))
							}}
						>
							내 그림
						</div>
					) : null}
				</div>
				{isMyMypage ? (
					<button
						onClick={() => {
							navigate('/paint', { state: { isEdit: false } })
						}}
					>
						그림그리기
					</button>
				) : null}
			</div>
		</div>
	)
}
const centerCSS = css`
	display: flex;
	justify-content: center;
`
const myPageNavCSS = css`
	font-family: 'LeferiPoint-WhiteObliqueA';
	color: white;
	display: flex;
	/* margin-left: 100px; */
	width: 60%;
	justify-content: space-between;
	border-bottom: 1px solid white;
	div {
		margin: 0px 10px 0px 10px;
	}
	button {
		outline: 'none';
		width: 120px;
		height: 35px;
		font-size: 15px;
		cursor: url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto;
		border: 0px;
		margin: 0px 10px 5px 10px;
		color: #1b5198;
		background-color: #d1e4ff;
		border-radius: 12px;
		width: '8em';
		font-family: 'GongGothicMedium';
	}
	.myPageLine {
		display: flex;
		align-items: center;
	}
`
