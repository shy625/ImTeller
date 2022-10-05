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
	const [page, setPage] = useState(0)

	// 카드 carousel
	let limit = 3
	const numPages = Math.ceil(cardList.length / limit) || 1
	console.log('numPages', numPages)
	// 왼쪽
	const moveLeft = () => {
		let num: number = Math.floor(page / limit)
		if (num === 0) {
			setPage((numPages - 1) * limit)
		} else {
			setPage((num - 1) * limit)
		}
	}
	// 오른쪽
	const moveRight = () => {
		let num: number = Math.floor(page / limit)
		console.log('page', page)
		if (num === numPages - 1) {
			setPage(0)
		} else {
			setPage((num + 1) * limit)
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
				) : type ? (
					<div className="window">
						<button onClick={moveLeft}>&lt;</button>
						<div className="container">
							<div css={paintListCSS}>
								{cardList.slice(page, page + limit).map((paint) => {
									return <Paint paint={paint} type={type} key={paint.paintId} />
								})}
							</div>
						</div>
						<button onClick={moveRight}>&gt;</button>
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
	display: flex;
	justify-content: center;
	/* flex-wrap: wrap; */
`
