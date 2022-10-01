import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import Card from 'components/card'
import Paint from 'components/paint'

import { createCard, sellCard, purchaseCard, cancelDeal } from 'contract/API'
import { allowedNodeEnvironmentFlags } from 'process'

export default function CardList(props: any) {
	const { cardList } = props
	const currentUser = useSelector((state: any) => state.currentUser)

	const [connectedWallet, setConnectedWallet] = useState('')
	const metamaskConnected = () => {
		if (!window.ethereum) {
			// alert('메타마스크 설치해')
			window.open('https://metamask.io/download.html')
			return false
		} else {
			window.ethereum.request({ method: 'eth_requestAccounts' }).then((result: any) => {
				console.log('메타메스크 로그인 완료')
				setConnectedWallet(result[0])
				return true
			})
		}
	}
	const mintPaint = async (walletAddress: any, image: any) => {
		console.log('민팅 함수 시작')
		console.log(walletAddress)
		const check = await metamaskConnected()
		console.log(connectedWallet)
		if (connectedWallet === currentUser.wallet) {
			console.log('카드 팔아야지')
			const selling = await createCard(walletAddress, image)
		}
	}
	const registerSale = async (walletAddress: string, tokenId: any, instantPrice: any) => {
		const check = await metamaskConnected()
		console.log(connectedWallet)
		if (connectedWallet === currentUser.wallet) {
			console.log('카드 팔아야지')
			const selling = await sellCard(walletAddress, tokenId, instantPrice)
		}
	}
	const buyNft = async (walletAddress: any, dealAddress: any, instantPrice: any) => {
		purchaseCard(currentUser.wallet, dealAddress, 10)
	}
	const cancel = async (walletAddress: any, dealAddress: any) => {
		cancelDeal(currentUser.wallet, dealAddress)
	}
	let tempImg = 'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222729012744-하트.png'
	return (
		<div>
			<button onClick={() => registerSale(currentUser.wallet, 3, 13)}>
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
				onClick={() => buyNft(currentUser.wallet, '0xE8738b3057a697E90e8Ee365f0eBac09BEBf9F58', 10)}
			>
				{/* <img src={tempImg} alt="" /> */}
				카드 구매하기
			</button>
			{cardList.length ? (
				cardList[0].cardId ? (
					cardList.map((card) => {
						return (
							<div key={card.cardId} onClick={() => registerSale(currentUser.wallet, 1, 10)}>
								<Card card={card} />
							</div>
						)
					})
				) : (
					cardList.map((paint) => {
						return (
							<div
								key={paint.paintId}
								onClick={() => mintPaint(currentUser.wallet, paint.paintImageURL)}
							>
								<Paint paint={paint} />
							</div>
						)
					})
				)
			) : (
				<div>작품이 없습니다</div>
			)}
		</div>
	)
}
