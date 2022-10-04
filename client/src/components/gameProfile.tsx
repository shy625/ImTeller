/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import defaultProfile from 'assets/image/defaultProfile.webp'

// 텔러면 왕관 씌우기? 점수도 같이 표시
export default function GameProfile(props: any) {
	const { player, phase } = props

	return (
		<div css={profileCSS}>
			<img css={imgSizeCSS} src={player.profile || defaultProfile} alt="프로필이미지" />
			<div>{player.nickname}</div>
			<div>{player.score}</div>
			<div>{phase !== 4 ? (player.status ? '✔' : '❌') : null}</div>
		</div>
	)
}

const imgSizeCSS = css({
	borderRadius: '100%',
	width: '8em',
	objectFit: 'cover',
})

const profileCSS = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})
