/** @jsxImportSource @emotion/react */
import Card from 'components/card'
import Paint from 'components/paint'
import { css } from '@emotion/react'

interface CardListProps {
	cardList: any[]
	isCard?: boolean
	type?: number
}

export default function CardList(props: CardListProps) {
	const { cardList, isCard, type } = props

	return (
		<div css={centerCSS}>
			{cardList.length ? (
				isCard ? (
					<div css={paintListCSS}>
						{cardList.map((card) => {
							return <Card card={card} type={type} key={card.cardId} />
						})}
					</div>
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
`
const paintListCSS = css`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 60%;
`
