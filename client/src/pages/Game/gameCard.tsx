import { css } from '@emotion/react'

import poo from 'assets/image/blind.webp'

export default function GameCard(props: any) {
	// 아이템 효과있으면 적용시키기
	const { cardUrl, darkmode, blind, blindDetail } = props

	return (
		<div style={{ position: 'relative' }}>
			<img
				style={{ filter: darkmode ? 'grayscale(100%)' : null }}
				css={gameCardCSS}
				src={cardUrl}
				alt=""
			/>
			{blind && blindDetail >= 20 ? (
				<div css={poo1CSS}>
					<img src={poo} title="똥" />
				</div>
			) : null}
			{blind && blindDetail >= 40 ? (
				<div css={poo2CSS}>
					<img src={poo} title="똥" />
				</div>
			) : null}
			{blind && blindDetail >= 60 ? (
				<div css={poo3CSS}>
					<img src={poo} title="똥" />
				</div>
			) : null}
		</div>
	)
}

const gameCardCSS = css`
	height: 200px;
`
const poo1CSS = css`
	position: absolute;
	left: 5px;
	top: 0px;
`
const poo2CSS = css`
	position: absolute;
	top: 65px;
	left: 30px;
`
const poo3CSS = css`
	position: absolute;
	top: 125px;
	left: 55px;
`
