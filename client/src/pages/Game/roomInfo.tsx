import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import back from 'assets/image/arrow.webp'

const RoomInfo = (props: any) => {
	const navigate = useNavigate()
	const { roomName, leader, players, maxNum, type, typeNum } = useSelector(
		(state: any) => state.roomInfo,
	)
	return (
		<div css={infos}>
			<div css={backBtn} onClick={() => navigate(-1)}>
				<img src={back} alt="뒤로 가기" css={imgSize} />
			</div>
			<div>{roomName}</div>
			<div>방장 : {leader}</div>
			<div>
				종료 조건 : {typeNum}
				{type === 'score' ? '점수' : '라운드'}
			</div>
			<div>
				{players.length} / {maxNum}
			</div>
		</div>
	)
}
export default RoomInfo

const infos = css({
	display: 'flex',
})

const backBtn = css({
	cursor: 'pointer',
})

const imgSize = css({
	cursor: 'pointer',
	width: '2em',
	margin: 10,
})
