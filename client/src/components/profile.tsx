import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

export default function Profile(props: any) {
	const navigate = useNavigate()
	const { nickname, profile } = props

	return (
		<div
			onClick={() => {
				navigate(`/mypage/${nickname}`)
			}}
			css={profileCss}
		>
			<img src={profile} alt="" css={profileImgCss} title={nickname} />
			<div>{nickname}</div>
		</div>
	)
}
const profileCss = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: 10,
	marginRight: 20,
	cursor: `url('https://imtellercard.s3.ap-northeast-2.amazonaws.com/brushClick.png'), auto`,
})
const profileImgCss = css({
	width: 35,
	borderRadius: '100%',
	margin: 10,
})
