import React from 'react'

export default function Card(props: any) {
  const {
    cardTitle,
    cardImageURL,
    description,
    grade,
    effect,
    effectDetail,
    createdDt,
    recentPrice,
  } = props.card

  // effect는 이미지로 바꿔서 표시

  return (
    <div>
      <img style={{ height: '15vh' }} src={cardImageURL} alt="" />
      {cardTitle}
      {description}
      {grade}
      {createdDt}
      {recentPrice}
    </div>
  )
}
