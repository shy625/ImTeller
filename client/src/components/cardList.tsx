import React from 'react'

import { useNavigate } from 'react-router-dom'
import Card from 'components/card'
import Paint from 'components/paint'

export default function CardList(props: any) {
  const { cardList } = props
  const navigate = useNavigate()
  return (
    <div>
      {cardList.length ? (
        cardList[0].cardId ? (
          cardList.map((card) => {
            return <Card card={card} key={card.cardId} />
          })
        ) : (
          cardList.map((paint) => {
            return (
              <div key={paint.paintId}>
                <button
                  onClick={() => {
                    navigate(`/paint/${paint.paintId}`)
                  }}
                >
                  그림 수정하기
                </button>
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
