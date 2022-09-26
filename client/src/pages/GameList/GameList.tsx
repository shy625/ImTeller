/** @jsxImportSource @emotion/react */

import React from 'react'
import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import { useBGM } from 'actions/hooks/useBGM'
import Layout from 'layout/layout'
import Room from 'pages/GameList/Room'
import MakeRoom from 'pages/GameList/MakeRoomModal'
import Pagination from 'pages/GameList/Pagination'

export default function GameList() {
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(false)

  const openModal = () => {
    setModalOpen(!modalOpen)
  }

  const navigate = useNavigate()

  const goRoom = (roomId: number) => {
    navigate(`/game/${roomId}`)
  }

  useBGM({ src: 'assets/audio/gameListBgm.mp3', volume: 50 })

  return (
    <Layout>
      <div css={roomBg}>
        <h2>게임방 목록입니다</h2>
        <button onClick={openModal}>방만들기</button>
        <MakeRoom open={modalOpen} close={openModal} />
        <div css={rooms}>
          {roomsDummy.map((room: any) => (
            <div css={roomOne} key={room.num} onClick={() => goRoom(room.num)}>
              <Room
                num={room.num}
                name={room.name}
                people={room.people}
                max={room.max}
                method={room.method}
                pw={room.pw}
              />
            </div>
          ))}
        </div>
        <Pagination total={roomsDummy.length} limit={8} page={page} setPage={setPage} />
      </div>
    </Layout>
  )
}

const roomsDummy: any = [
  {
    num: 1,
    name: '내가 최고다',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '',
  },
  {
    num: 3,
    name: '쨔잔',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '1234',
  },
  {
    num: 9,
    name: '509',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '',
  },
  {
    num: 21,
    name: '간드아',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '',
  },
  {
    num: 2,
    name: '내가 최고다',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '',
  },
  {
    num: 4,
    name: '쨔잔',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '1234',
  },
  {
    num: 8,
    name: '509',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '',
  },
  {
    num: 10,
    name: '간드아',
    people: 3,
    max: 5,
    method: '라운드',
    pw: '',
  },
]

const rooms = css({
  display: 'flex',
  flexWrap: 'wrap',
})
const roomOne = css({
  boxSizing: 'border-box',
  background: 'rgba(255, 255, 255, .3)',
  borderRadius: 15,
  margin: '1em',
  padding: '1em',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '40%',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '2px 2px 2px 2px rgba(255, 255, 255, 0.2)',
  },
})
const roomBg = css({
  backgroundImage: 'linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)',
  backgroundSize: 'cover',
})
