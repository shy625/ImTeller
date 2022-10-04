/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { normalBtn } from 'style/commonStyle'

export default function Deal(props: any) {
	const navigate = useNavigate()
	const currentUser = useSelector((state: any) => state.currentUser)

	const {
		dealId,
		instantPrice,
		finalBidPrice,
		tag,
		finishedAt,
		cardId,
		cardTitle,
		cardImageUrl,
		designerId,
		designerNickname,
		grade,
		effect,
	} = props.deal

	const goDetail = () => {
		if (!currentUser.nickname) return navigate('/login')
		navigate(`/deal/${dealId}`)
	}

	return (
		<div css={box}>
			<div css={card}>
				<img src={cardImageUrl} />
			</div>
			<div css={explain}>
				<div css={title}>{cardTitle}</div>
				<div css={body}>
					<br />
					<div css={left}> Designed by.</div>
					<br />
					<div css={right}>{designerNickname}</div>
					<br />
					<div css={left}>Price</div>
					<br />
					<div css={right}>{instantPrice} SSF</div>
					<br />
					<div css={left}>Ends in </div>
					<br />
					<div css={right}>{finishedAt}</div>
				</div>
				<button css={normalBtn} onClick={goDetail}>
					상세보기
				</button>
			</div>
		</div>
	)
}

const box = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	color: black;
	margin: 10px;
	padding: 5px;
	background-color: rgb(255, 255, 255, 0.6);
	border-radius: 15px;
`

const card = css`
	position: relative;
	height: 214px;
	width: 143px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 13px solid #f4f4f4;
	margin: 10px;

	img {
		height: 222px;
		background-color: white;
		border-radius: 12px;
	}
`

const explain = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
`
const title = css`
	font-size: 20px;
	font-weight: bold;
`
const body = css`
	margin-bottom: 20px;
`

const right = css`
	font-size: 17px;
	float: right;
	margin-bottom: 5px;
`

const left = css`
	font-family: 'GmarketSansMedium';
	font-size: 13px;
	float: left;
`
