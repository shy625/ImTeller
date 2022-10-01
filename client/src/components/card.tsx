/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { setSelectedCards } from 'store/modules/game'
import itemDetail from 'actions/functions/itemDetail'

export default function Card(props: any) {
  const {
    cardId,
    cardTitle,
    cardImageURL,
    description,
    grade,
    effect,
    effectDetail,
    createdDt,
    recentPrice,
  } = props.card
  const type = props.type
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectedCards = useSelector((state: any) => state.selectedCards)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (selectedCards.includes(cardId)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [selectedCards])

  const [effectPre, effectPost, effectName] = itemDetail(effect, effectDetail)

  // 기본적으로 호버시 카드 등급같은 능력 나오게
  // type 0: 선택 불가능하게
  // type 1: 카드 선택 모달에서 사용. 선택카드의 경우(selectedCards에 포함) 표시

  const select = () => {
    if (type === 1) {
      dispatch(setSelectedCards(cardId))
    }
  }

  return (
    <div>
      <div css={type === 1 && selected ? type1CSS : type0CSS} onClick={select}>
        <img style={{ height: '15vh' }} src={cardImageURL} alt="" />
        <div css={!selected ? type0InfoCSS : { display: 'none' }}>
          <div>{grade}</div>
          <div>{effectName}</div>
          <div>{`${effectDetail} ${effectPost}`}</div>
        </div>
        <div css={type === 1 && selected ? type1InfoCSS : { display: 'none' }}>✔</div>
      </div>
      {type === 0 ? (
        <div>
          {cardTitle}
          {description}
          {createdDt}
          {recentPrice}
        </div>
      ) : null}
    </div>
  )
}

const type0CSS = css`
  height: 15vh;
  &:hover {
    > div {
      display: block;
    }
    > img {
      filter: brightness(0.5);
    }
  }
`
const type0InfoCSS = css`
  display: none;
  position: relative;
  top: -15vh; // 부모인 paintImgCSS 높이만큼 올려주면 됨
  width: 100%;
  height: 100%;
`
const type1CSS = css`
  filter: brightness(0.5);
`
const type1InfoCSS = css`
  position: absolute;
  top: 6vh;
  left: 4.5vh;
`
