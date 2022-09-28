/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import Layout from 'layout/layout'
import Pagination from 'pages/GameList/pagination'
import Room from 'pages/GameList/room'

import game from 'actions/api/game'
import { setRoomList } from 'store/modules/game'
import { useBGM } from 'actions/hooks/useBGM'
import { useModal } from 'actions/hooks/useModal'

export default function GameList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [setModalState, setModalMsg] = useModal()

  const roomList = useSelector((state: any) => state.roomList)

  useBGM({ src: 'assets/audio/gameListBgm.mp3' })

  useEffect(() => {
    game.roomList().then((result) => {
      dispatch(setRoomList(result.data.gameList))
    })
  }, [])

  const joinRoom = (roomId, isLocked) => {
    setModalMsg(isLocked)
    navigate(`/game/${roomId}`)
    // setTimeout(() => navigate(`/game/${roomId}`), 1000)
  }

  return (
    <Layout>
      <main>
        <h2>게임방 목록입니다</h2>
        <button
          onClick={() => {
            setModalState('makeRoom')
          }}
        >
          방만들기
        </button>
        <div css={roomListCSS}>
          {roomList.map((room: any) => (
            <div key={room.roomId} onClick={() => joinRoom(room.roomId, room.isLocked)}>
              <Room room={room} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  )
}

const roomListCSS = css({
  display: 'flex',
  flexWrap: 'wrap',
})
