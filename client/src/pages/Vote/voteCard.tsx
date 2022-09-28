import React from 'react'

import Layout from 'layout/layout'

import { useModal } from 'actions/hooks/useModal'

export default function VoteCard(props: any) {
  const { paintId, paintTitle, paintImageURL, description } = props.paint
  const [setModalState, setModalMsg] = useModal('')

  const onClick = () => {
    setModalMsg(props.paint)
    setModalState('vote')
  }

  return (
    <div onClick={onClick}>
      <div>
        <img src={paintImageURL} />
        {paintTitle}
        {description}
        <div>좋아요수</div>
      </div>
      <button>추천하기</button>
    </div>
  )
}
