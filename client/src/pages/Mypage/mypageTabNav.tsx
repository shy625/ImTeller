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
				<div
					onClick={() => {
						dispatch(setMyPageTab(0))
					}}
				>
					NFT 카드
				</div>
				{isMyMypage ? (
					<>
						<div
							onClick={() => {
								dispatch(setMyPageTab(1))
							}}
						>
							내 그림
						</div>
						<div
							onClick={() => {
								navigate('/paint', { state: { isEdit: false } })
							}}
						>
							그림그리기
						</div>
					</>
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
	width: 80%;
	div {
		margin: 10px;
	}
`
