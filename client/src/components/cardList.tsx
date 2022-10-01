import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import Card from 'components/card'
import Paint from 'components/paint'

export default function CardList(props: any) {
  const { cardList, isCard, type } = props

  return (
    <div>
      {cardList.length ? (
        isCard ? (
          cardList.map((card) => {
            return <Card card={card} type={type} key={card.cardId} />
          })
        ) : (
          cardList.map((paint) => {
            return <Paint paint={paint} type={type} key={paint.paintId} />
          })
        )
      ) : (
        <div>{isCard ? 'NFT' : '그림'} 작품이 없습니다</div>
      )}
    </div>
  )
}
