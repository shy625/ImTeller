/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import { fullDisplay } from 'style/commonStyle'

export default function FaqViewer() {
	return (
		<div css={fullDisplay}>
			<div css={box}>
				<h2>Game Rule</h2>
				<iframe
					height="100%"
					width="80%"
					src="https://www.youtube.com/embed/LX-FP3Ci3kk"
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	)
}
const box = css`
	display: flex;
	height: 80vh;
	width: auto;
	flex-direction: column;
	align-items: center;
	color: white;
	font-family: 'GongGothicMedium';
`
