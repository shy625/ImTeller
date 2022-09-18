import React from 'react'

export default function Card(props: any) {
  const { cardTitle, cardImageURL, content } = props.card

  return (
    <div>
      <img src={cardImageURL} alt="" />
      {cardTitle}
      {content}
    </div>
  )
}
