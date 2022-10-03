/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
export default function RankTabNav(props: any) {
	const { setTabNo } = props

	return (
		<div css={box}>
			<div
				onClick={() => {
					setTabNo(0)
				}}
			>
				NFT
			</div>
			<div
				onClick={() => {
					setTabNo(1)
				}}
			>
				승률
			</div>
			<div
				onClick={() => {
					setTabNo(2)
				}}
			>
				레벨
			</div>
			<div
				onClick={() => {
					setTabNo(3)
				}}
			>
				이달의 NFT
			</div>
		</div>
	)
}
const box = css`
	display: flex;
	margin: 10px;
	color: white;
	justify-content: space-around;
`
