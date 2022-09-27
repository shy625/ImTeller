/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import GameProfile from 'components/gameProfile'

import art from 'actions/api/art'
import { setCardList } from 'store/modules/user'
import { useModal } from 'actions/hooks/useModal'

export default function GameRoom(props: any) {
  const dispatch = useDispatch()
  const roomId = useParams().roomId
  const { stompClient } = props
  const cardList = useSelector((state: any) => state.cardList)
  const { nickname } = useSelector((state: any) => state.currentUser)
  const players = useSelector((state: any) => state.players)

  useEffect(() => {
    art.cardList({ nickname }).then((result) => {
      dispatch(setCardList(result.data))
    })
  }, [])

  const [setModalState, setModalMsg] = useModal()

  return (
    <div css={main}>
      <div css={players}>
        {players.map((player: any) => (
          <div key={player.nickname} css={playerOne}>
            <GameProfile player={player} />
          </div>
        ))}
      </div>

      <button
        css={button}
        onClick={() => {
          setModalState('cardSelect')
        }}
      >
        카드 선택
      </button>
      <button css={button}>취소</button>
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
