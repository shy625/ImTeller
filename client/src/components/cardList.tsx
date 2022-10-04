/** @jsxImportSource @emotion/react */
import Card from 'components/card'
import Paint from 'components/paint'
import { css } from '@emotion/react'

import { useState } from 'react'

interface CardListProps {
	cardList: any[]
	isCard?: boolean
	type?: number
}

export default function CardList(props: CardListProps) {
	const { cardList, isCard, type } = props

	// 카드 carousel
	let limit = 3
	const numPages = Math.ceil(cardList.length / limit) || 1
	const [page, setPage] = useState(0)
	// 왼쪽
	const moveLeft = () => {
		let num: number = Math.floor(page / limit)
		if (num === 0) {
			setPage((numPages - 1) * 6)
		} else {
			setPage((num - 1) * 6)
		}
	}
	// 오른쪽
	const moveRight = () => {
		let num: number = Math.floor(page / limit)
		if (num === numPages - 1) {
			setPage(0)
		} else {
			setPage((num + 1) * 6)
		}
	}

	return (
		<div css={centerCSS}>
			{cardList.length ? (
				isCard ? (
					type ? (
						<div className="window">
							<button onClick={moveLeft}>&lt;</button>
							<div className="container">
								<div css={paintListCSS}>
									{cardList.slice(page, page + limit).map((card) => {
										return <Card card={card} type={type} key={card.cardId} />
									})}
								</div>
							</div>
							<button onClick={moveRight}>&gt;</button>
						</div>
					) : (
						<div css={paintListCSS}>
							{cardList.map((card) => {
								return <Card card={card} type={type} key={card.cardId} />
							})}
						</div>
					)
				) : (
					<div css={paintListCSS}>
						{cardList.map((paint) => {
							return <Paint paint={paint} type={type} key={paint.paintId} />
						})}
					</div>
				)
			) : (
				<div>{isCard ? 'NFT' : '그림'} 작품이 없습니다</div>
			)}
		</div>
	)
}
const centerCSS = css`
	display: flex;
	justify-content: center;
	.window button {
		outline: none;
		cursor: pointer;
		border: 0;
		padding: 6px 12px;
		margin: 0px 10px 5px 10px;
		color: #1b5198;
		background-color: #d1e4ff;
		border-radius: 12px;
		font-size: 13px;
		width: 30px;
		font-family: 'GongGothicMedium';
		height: 30px;
	}
	.container {
		width: 500px;
	}
	.window {
		/* overflow: hidden; */
		/* position: relative; */
		/* width: 500px; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
`
const paintListCSS = css`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
