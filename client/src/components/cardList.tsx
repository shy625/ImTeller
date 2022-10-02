import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import Card from 'components/card'
import Paint from 'components/paint'

export default function CardList(props: any) {
	const { cardList, isCard, type } = props
	const currentUser = useSelector((state: any) => state.currentUser)

	return (
		<div>
			<button onClick={() => registerSale(currentUser.wallet, 8, 10)}>
				{/* <img src={tempImg} alt="" /> */}
				카드 판매하기
			</button>
			<button
				onClick={() => cancel(currentUser.wallet, '0xFc0a9e87D869a5F83a1B7ADFc8632EaD585BFc3C')}
			>
				{/* <img src={tempImg} alt="" /> */}
				판매취소
			</button>
			<button
				onClick={() => buyNft(currentUser.wallet, '0x66895EB10dF32CF8A869D07DF252f980cD6fEB2c', 10)}
			>
				{/* <img src={tempImg} alt="" /> */}
				카드 구매하기
			</button>
			{cardList.length ? (
				isCard ? (
					cardList.map((card) => {
						return <Card card={card} type={type} key={card.cardId} />
					})
				) : (
					cardList.map((paint) => {
						return (
							// <div
							// 	key={paint.paintId}
							// 	onClick={() => mintPaint(currentUser.wallet, paint.paintImageURL)}
							// >
							<Paint paint={paint} key={paint.paintId} type={type} />
							// </div>
						)
					})
				)
			) : (
				<div>{isCard ? 'NFT' : '그림'} 작품이 없습니다</div>
			)}
		</div>
	)
}
