import { css } from '@emotion/react'
import { rankListProps, dealRankProps } from './Rank'
export default function rankListDeal({ rankList }: { rankList: rankListProps }) {
	// export default function rankListDeal(props: any[]) {
	const dealRankList: dealRankProps[] = rankList.dealRankList
	// console.log('rankList', typeof rankList)
	// console.log(rankList[0])
	return (
		<div css={box}>
			<div css={list}>
				{dealRankList ? (
					dealRankList.map((rank, i) => (
						<div key={i} css={cardCSS}>
							<div css={type0CSS}>
								<img src={rank.cardImageURL} alt="" css={imgCSS} />
							</div>
							<div className="cardInfo">
								<div id="title">{rank.cardTitle}</div>
								<div id="buyer">구매자 {rank.buyerNickname}</div>
								<div id="designer">designed by</div>
								<div id="designer">by. {rank.designerNickname}</div>
								<div id="price">{rank.price} SSF</div>
								{/* <div>{rank.dealedAt.slice(0, 10)}</div> */}
							</div>
						</div>
					))
				) : (
					<div>해당하는 데이터가 없습니다</div>
				)}
			</div>
		</div>
	)
}
const box = css`
	display: flex;
	flex-direction: column;
	margin: 2rem;
`

const list = css`
	width: 100%;
	height: 70vh;
	background-color: rgba(239, 238, 245, 0.3);
	border-radius: 1rem;
	box-shadow: 2px 2px 16px;
	margin-bottom: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`
const cardCSS = css`
	margin: 10px;
	font-family: 'GmarketSansMedium';
	display: flex;
	flex-direction: column;
	align-items: center;
	#title {
		font-family: 'GongGothicMedium';
		font-size: 20px;
		text-align: center;
	}
	#designer {
		font-size: 13px;
	}
	.cardInfo div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: break-all;
		width: 130px;
	}
`
const imgCSS = css`
	width: 125px;
	height: 185px;
	background-color: white;
	border-radius: 6px;
`
const type0CSS = css`
	position: relative;
	height: 185px;
	width: 125px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 13px solid #f4f4f4;
	margin: 10px;
`
