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

  return (
    <div>
      <img style={{ height: '15vh' }} src={cardImageURL} alt="" />
      {cardTitle}
      {description}
    </div>
  )
}
