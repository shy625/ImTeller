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
			<div css={title}>{cardTitle}</div>
			<div css={card}>
				<img src={cardImageUrl} />
			</div>
			<div>
				{designerNickname}
				<br />
				{/* 현재 입찰가 : {finalBidPrice}
				<br /> */}
				즉시 구매가 : {instantPrice}
				<br />
				{finishedAt}
			</div>
			<button css={normalBtn} onClick={goDetail}>
				구매 하기
			</button>
		</div>
	)
}
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

const box = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
`
const title = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: bold;
	color: white;
`
