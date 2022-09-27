import React from 'react'

export default function Paint(props: any) {
  const { paintId, paintTitle, paintImageURL, description } = props.paint

  return (
    <div>
      <img style={{ height: '15vh' }} src={paintImageURL} alt="" />
      {paintTitle}
      {description}
    </div>
  )
}
