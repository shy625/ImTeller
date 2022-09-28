import React from 'react'

import Card from 'components/card'
import Paint from 'components/paint'

export default function CardList(props: any) {
  const { cardList } = props

  return (
    <div>
      {cardList.length ? (
        cardList[0].cardId ? (
          cardList.map((card) => {
            return <Card card={card} key={card.cardId} />
          })
        ) : (
          cardList.map((paint) => {
            return <Paint paint={paint} key={paint.paintId} />
          })
        )
      ) : (
        <div>작품이 없습니다</div>
      )}
    </div>
  )
}
