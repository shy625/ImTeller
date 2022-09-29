import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import DealHistory from 'pages/DealDetail/dealHistory'
import Layout from 'layout/layout'

import deal from 'actions/api/deal'
import itemDetail from 'actions/functions/itemDetail'
import { setDealDetail } from 'store/modules/art'

export default function DealDetail() {
  const dispatch = useDispatch()
  const { dealId } = useParams()
  const dealDetail = useSelector((state: any) => state.dealDetail)
  const [dealInfo, setDealInfo] = useState<any>({})
  const [cardInfo, setCardInfo] = useState<any>({})
  const [dealHistoryList, setDealHistoryList] = useState<any>([])

  const [effectPre, effectPost] = itemDetail(cardInfo.effect, cardInfo.effectDetail)

  useEffect(() => {
    deal.dealDetail(dealId).then((result) => {
      dispatch(setDealDetail(result.data.response))
    })
  }, [])

  useEffect(() => {
    if (!dealDetail) return
    setDealInfo(dealDetail.dealInfo)
    setCardInfo(dealDetail.cardInfo)
    setDealHistoryList(dealDetail.dealHistoryList)
  }, [dealDetail])

  return (
    <Layout>
      <main>
        <div>
          <div>
            <img src={cardInfo.cardImageUrl} alt="" />
            by. {cardInfo.designerNickname}
          </div>
          <div>
            <p>{dealInfo.tag}</p>
            <p>{dealInfo.cardTitle}</p>
            <p>{cardInfo.ownerId}. 소유</p>
            <br />
            {cardInfo.description}
            {cardInfo.grade} | {effectPre + String(cardInfo.effectDetail) + effectPost}
            {/* 시간 포멧 찾아서 차이 계산해서 넣기 */}
            <div>
              <div>즉시 구매가 {dealInfo.instantPrice}SSF</div>
              <div>최고 입찰가 {dealInfo.finalBidPrice}SSF</div>
            </div>
          </div>
        </div>
        <DealHistory dealHistoryList={dealHistoryList} />
      </main>
    </Layout>
  )
}
