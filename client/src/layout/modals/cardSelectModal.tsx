/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import Card from 'components/card'

import { setModalState } from 'store/modules/util'
import { setSelectedCards } from 'store/modules/game'

export default function CardSelectModal(props: any) {
  const dispatch = useDispatch()
  const cardList = useSelector((state: any) => state.cardList)
  const selectedCards = useSelector((state: any) => state.selectedCards)

  return (
    <div>
      <div>
        {cardList.map((card) => (
          <div key={card.cardId}>
            <Card card={card} selected={selectedCards.includes(card.cardId) ? true : false} />
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(setModalState(''))}>취소</button>
    </div>
  )
}
