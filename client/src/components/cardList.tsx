import React from 'react'

import Card from 'components/card'

export default function CardList(props: any) {
  const { cardList } = props

  return (
    <div>
      CardList
      {cardList.map((card, idx) => {
        return <Card card={card} key={idx + card.cardTitle} />
      })}
    </div>
  )
}
