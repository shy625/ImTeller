//import
import { coinContract } from './CoinABI'
import { cardAddress, cardContract } from './CardABI'
import { web3, marketContract } from './MarketABI'
import dealABI from './DealABI'

//mint
export const createCard = async (walletAddress: string, image: any) => {
	const admin = '0x3f317D1680B8B60da4323bbB1328a8F0DD44edfb'
	const wallet = walletAddress
	const tokenURI = image
	const approvalToPay = await coinContract.methods.approve(cardAddress, 10).send({ from: wallet })
	let token_id: any
	if (approvalToPay.status) {
		token_id = await cardContract.methods.create(tokenURI).send({ from: wallet })
	}
	console.log(token_id.events.Transfer.returnValues.tokenId)
}

//new Deal
export const sellCard = async (
	walletAddress: string,
	image: any,
	token_id: any,
	wantedPrice: any,
) => {
	// 'wallet은 유저의 account Address'
	const wallet = walletAddress
	// '판매할 카드 url'
	const tokenURL = image
	//'판매할 카드의 token Id'
	const tokenId = token_id
	// '판매가격'
	const price = 10
	console.log('거래 등록 ' + tokenId)
	const dealCA = await marketContract.methods.createDeal(tokenId, price).send({ from: wallet })
	console.log('거래 등록 완료')
	console.log('deal', dealCA)
	const contract_id = dealCA.events.NewDeal.returnValues.dealAddress
	await cardContract.methods.setApprovalForAll(contract_id, true).send({ from: wallet })
}

//Card 구매
export const purchaseCard = async (dealId: any, walletAddress: any, wantedPrice: any) => {
	//   const dealCA = '내가 살 카드의 거래 CA'
	const dealCA = dealId
	console.log(dealCA)
	const dealInstance = new web3.eth.Contract(dealABI, dealCA)
	//   const wallet = 'wallet은 유저의 account Address'
	const wallet = walletAddress
	//   const price = '해당 카드 가격'
	const price = wantedPrice
	console.log('구매 시작 market purchase')
	const approvalToPay = await coinContract.methods.approve(dealCA, price).send({ from: wallet })
	console.log('권한 허용 완료')
	if (approvalToPay.status) {
		return await dealInstance.methods.purchase().send({ from: wallet })
	}
}

//판매 취소
export const cancelDeal = async (dealId: any) => {
	const dealCA = dealId
	const dealInstance = new web3.eth.Contract(dealABI, dealCA)
	const wallet = '0xc37d13b5523c1d80ba15ddfa5cd3bd1abb482aaf'
	//내가 cardContract에 setapprovalforall false하고 dealInstance는 상태값 변화만 시키는 거로 바꾸기
	const disapproval = await cardContract.methods
		.setApprovalForAll(dealCA, false)
		.send({ from: wallet })
	return await dealInstance.methods.cancelDeal().send({ from: wallet })
}
