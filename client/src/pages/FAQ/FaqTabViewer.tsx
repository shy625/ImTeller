import { css } from '@emotion/react'
import { fullDisplay } from 'style/commonStyle'

export default function FaqTabViewer() {
	return (
		<div css={fullDisplay}>
			<div css={box}>
				<iframe
					height="80%"
					width="80%"
					src="https://www.youtube.com/embed/FZPnNij__ZI"
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
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
	font-family: 'GmarketSansMedium';
	font-size: 30px;
`
