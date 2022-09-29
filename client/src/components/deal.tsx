import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Deal(props: any) {
  const navigate = useNavigate()
  const {
    dealId,
    instantPrice,
    finalBidPrice,
    tag,
    finishedAt,
    cardId,
    cardTitle,
    cardImageUrl,
    designerId,
    designerNickname,
    grade,
    effect,
  } = props.deal

  return (
    <div>
      제목 : {cardTitle}
      <img style={{ height: '15vh' }} src={cardImageUrl} />
      제작자 : {designerNickname}
      <br />
      현재 입찰가 : {finalBidPrice}
      <br />
      즉시 구매가 : {instantPrice}
      <br />
      {finishedAt}
      <button onClick={() => navigate(`deal/${dealId}`)}>구매 하기</button>
    </div>
  )
}
