/** @jsxImportSource @emotion/react */

import React from 'react'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import { useState } from 'react'

import GameProfile from 'components/gameProfile'
import CardSelectModal from 'pages/Game/cardSelectModal'
import { playersDummy } from 'pages/Game/dummys'

export default function GameRoom() {
  const roomId: any = useParams().gameId
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div css={main}>
      <div css={players}>
        {playersDummy.map((player: any) => (
          <div key={player.id} css={playerOne}>
            <GameProfile name={player.name} profile={player.profileUrl} />
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
