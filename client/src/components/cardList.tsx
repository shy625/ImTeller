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
		<div>
			{cardList.length ? (
				isCard ? (
					cardList.map((card) => {
						return <Card card={card} type={type} key={card.cardId} />
					})
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
const paintListCSS = css`
	display: flex;
`
