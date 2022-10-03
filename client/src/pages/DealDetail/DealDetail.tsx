/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import DealHistory from 'pages/DealDetail/dealHistory'
import Layout from 'layout/layout'

import deal from 'actions/api/deal'
import itemDetail from 'actions/functions/itemDetail'
import Loading from 'components/loading'
import { setDealDetail } from 'store/modules/art'
import { purchaseCard, cancelDeal } from 'contract/API'
import { setModalMsg, setModalState } from 'store/modules/util'

export default function DealDetail() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { dealId } = useParams()

	const dealDetail = useSelector((state: any) => state.dealDetail)
	const currentUser = useSelector((state: any) => state.currentUser)

	const [dealInfo, setDealInfo] = useState<any>({})
	const [cardInfo, setCardInfo] = useState<any>({})
	const [dealHistoryList, setDealHistoryList] = useState<any>([])

	const interval = useRef(null)
	const diffTime = useRef(0)
	const [day, setDay] = useState(0)
	const [hour, setHour] = useState(0)
	const [min, setMin] = useState(0)
	const [sec, setSec] = useState(0)
	const [loading, setLoading] = useState(false)

	const [effectPre, effectPost] = itemDetail(cardInfo.effect, cardInfo.effectDetail)

	useEffect(() => {
		deal
			.dealDetail(dealId)
			.then((result) => {
				console.log(result.data)
				dispatch(setDealDetail(result.data.response))
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	useEffect(() => {
		if (dealDetail) {
			setDealInfo(dealDetail.dealInfo)
			setCardInfo(dealDetail.cardInfo)
			setDealHistoryList(dealDetail.dealHistoryList)
		}
	}, [dealDetail])

	useEffect(() => {
		interval.current = setInterval(() => {
			const now = new Date()
			const finish = new Date(dealInfo.finishedAt.replace(' ', 'T'))
			diffTime.current = Math.floor((finish.getTime() - now.getTime()) / 1000)
			const d = Math.floor(diffTime.current / (24 * 60 * 60))
			const h = Math.floor((diffTime.current - d * 24 * 60 * 60) / (60 * 60))
			const m = Math.floor((diffTime.current - (d * 24 + h) * 60 * 60) / 60)
			const s = diffTime.current - (d * 24 * 60 + h * 60 + m) * 60
			setDay(d)
			setHour(h)
			setMin(m)
			setSec(s)
		}, 1000)
		return () => clearInterval(interval.current)
	}, [dealInfo])

	const buyNft = async (walletAddress: any, dealAddress: any, instantPrice: any) => {
		return purchaseCard(currentUser.wallet, dealAddress, instantPrice)
	}

	const cancelNft = async (walletAddress: any, dealAddress: any) => {
		return cancelDeal(currentUser.wallet, dealAddress)
	}

	const onCancel = () => {
		cancelNft(currentUser.wallet, dealInfo.dealAddress)
			.then((result) => {
				console.log(result)
				deal
					.cancelDeal(dealInfo.dealId)
					.then((result) => {
						setModalMsg('취소가 성공적으로 이루어졌습니다.')
						setModalState('alert')
						console.log(result)
						navigate('/deal')
					})
					.catch((error) => {
						setModalMsg('예기치 못한 오류로 취소가 이루어지지 않았습니다.')
						setModalState('alert')
						navigate(`/deal/${dealId}`)
						console.error(error)
					})
			})
			.catch((error) => {
				setModalMsg('예기치 못한 오류로 취소가 이루어지지 않았습니다.')
				setModalState('alert')
				navigate(`/deal/${dealId}`)
				console.log(error)
			})
	}

	const onBuy = () => {
		if (loading) return
		setLoading(true)
		// bid type 0은 입찰, 1은 즉시구매 - 근데 뭐든지 넣어도 상관없음
		const data = {
			bidPrice: dealInfo.instantPrice,
			bidType: 1,
			bidderNickname: currentUser.nickname,
		}
		deal
			.bid(dealId, data)
			.then((result) => {
				console.log(result)
				console.log('bid 성공적으로 보냄')
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
				setModalMsg('예기치 못한 오류로 구매가 이루어지지 않았습니다.')
				setModalState('alert')
			})
		buyNft(currentUser.wallet, dealInfo.dealAddress, dealInfo.instantPrice)
			.then((result) => {
				console.log(result)
				deal
					.dealEnd(dealInfo.dealId, {
						bidderNickname: currentUser.nickname,
						tokenId: cardInfo.tokenId,
					})
					.then((result) => {
						console.log(result.data)
						setLoading(false)
						setModalMsg('거래가 성공적으로 이루어졌습니다')
						setModalState('alert')
					})
					.catch((err) => {
						setLoading(false)
						setModalMsg('예기치 못한 오류로 구매가 이루어지지 않았습니다.')
						setModalState('alert')
					})
			})
			.catch((err) => {
				console.log(err)
				deal
					.dealEnd(null, null)
					.then((result) => {
						console.log(result)
					})
					.catch((err) => {
						console.log(err)
					})
				setLoading(false)
				setModalMsg('예기치 못한 오류로 구매가 이루어지지 않았습니다.')
				setModalState('alert')
			})
		setLoading(false)
	}

	return (
		<Layout>
			<main>
				<div css={dealDetailCSS}>
					<div>
						<img src={cardInfo.cardImageURL} alt="" />
						by. {cardInfo.designerNickname}
					</div>
					<hr />
					<div>
						<p>{dealInfo.tag}</p>
						<p>{dealInfo.cardTitle}</p>
						<p>{cardInfo.ownerNickname}. 소유</p>
						<br />
						{cardInfo.description}
						<br />
						{cardInfo.grade} | {effectPre + String(cardInfo.effectNum) + effectPost}
						<br />
						{day}일 {hour}시간 {min}분 {sec}초 남음
						<hr />
						<div>
							{cardInfo.ownerNickname === currentUser.nickname ? (
								<div>
									<button onClick={onCancel}>판매 취소</button>
								</div>
							) : (
								<>
									<div>
										즉시 구매가 {dealInfo.instantPrice}SSF
										<button onClick={onBuy}>즉시 구매</button>
									</div>
									{/* <div>
										최고 입찰가 {dealInfo.finalBidPrice}SSF
										<button>입찰</button>
									</div> */}
								</>
							)}
						</div>
					</div>
				</div>
				<hr />
				<DealHistory dealHistoryList={dealHistoryList} />
				{loading ? (
					<Loading msg={'체인에서 거래를 취소하는 중입니다.  잠시만 기다려주세요'} />
				) : null}
			</main>
		</Layout>
	)
}
const dealDetailCSS = css`
	color: white;
`
