/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'

export default function FaqViewer() {
	return (
		<div css={centerCSS}>
			<div>
				<h2>Game Rule</h2>
			</div>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/LX-FP3Ci3kk"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	)
}
const centerCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
`
