/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import GameProfile from 'components/gameProfile'
import CardSelectModal from 'pages/Game/cardSelectModal'

export default function GameRoom(props: any) {
  const players = useSelector((state: any) => state.players)
  const roomId = useParams().gameId
  const [modalOpen, setModalOpen] = useState(false)
  const { stompClient } = props

  const openModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div css={main}>
      <div css={players}>
        {players.map((player: any) => (
          <div key={player.nickname} css={playerOne}>
            <GameProfile player={player} />
          </div>
        ))}
      </div>

      <button css={button} onClick={openModal}>
        카드 선택
      </button>
      <button css={button}>취소</button>
      <CardSelectModal open={modalOpen} close={openModal} />
    </div>
  )
}

const players = css({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  width: '65%',
})

const playerOne = css({
  margin: '10px',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const main = css({
  display: 'flex',
  justifyContent: 'space-evenly',
})

const button = css({
  width: '10em',
  borderRadius: 15,
  margin: '1em',
  cursor: 'pointer',
})
