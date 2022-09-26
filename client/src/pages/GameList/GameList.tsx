/** @jsxImportSource @emotion/react */

import React from 'react'
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import { useBGM } from 'actions/hooks/useBGM'
import Layout from 'layout/layout'
import Room from 'pages/GameList/room'
import Pagination from 'pages/GameList/Pagination'
import game from 'actions/api/game'
import MakeRoom from './makeRoomModal'

export default function GameList() {
  const navigate = useNavigate()

  // api 연결 살아나면 roomsDummy 를 아래 변수로 바꾸면 됨
  const [roomList, setRoomList] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(0)
  const openModal = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    game.roomList().then((result) => {
      setRoomList(result.data.gameList)
    })
  }, [])

  const goRoom = (roomId: number) => {
    navigate(`/game/${roomId}`)
  }

  useBGM({ src: 'assets/audio/gameListBgm.mp3', volume: 50 })

  return (
    <Layout>
      <div>
        <h2>게임방 목록입니다</h2>
        <button onClick={openModal}>방만들기</button>
        <div css={rooms}>
          {roomsDummy.map((room: any) => (
            <div css={roomOne} key={room.roomId} onClick={() => goRoom(room.roomId)}>
              <Room
                num={room.roomId}
                name={room.roomName}
                people={room.peopleNum}
                max={room.maxPeopleNum}
                method={room.type}
                pw={room.isLocked}
                typeNum={room.typeNum}
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
    roomId: 1,
    roomName: '내가 최고다',
    isLocked: true,
    peopleNum: 3,
    maxPeopleNum: 5,
    type: '라운드',
    typeNum: 3,
  },
  {
    roomId: 3,
    roomName: '가즈아',
    isLocked: true,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '점수',
    typeNum: 30,
  },
  {
    roomId: 4,
    roomName: '자신있는 사람만 들어와',
    isLocked: false,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '점수',
    typeNum: 50,
  },
  {
    roomId: 5,
    roomName: '힘들군',
    isLocked: true,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '라운드',
    typeNum: 5,
  },
  {
    roomId: 10,
    roomName: '나는 더미데이터',
    isLocked: true,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '점수',
    typeNum: 20,
  },
  {
    roomId: 13,
    roomName: '곧 사라질 계획이지',
    isLocked: false,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '라운드',
    typeNum: 3,
  },
  {
    roomId: 14,
    roomName: '우승자리그',
    isLocked: false,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '라운드',
    typeNum: 4,
  },
  {
    roomId: 20,
    roomName: '클래식이 좋아',
    isLocked: true,
    peopleNum: 5,
    maxPeopleNum: 6,
    type: '라운드',
    typeNum: 8,
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
