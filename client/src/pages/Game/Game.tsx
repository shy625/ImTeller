/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import RoomInfo from 'components/roomInfo'
import Setting from 'components/setting'
import Chat from 'components/chat'

import GamePlay from 'pages/Game/gamePlay'
import GameRoom from 'pages/Game/gameRoom'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import { roomsDummy } from 'pages/Game/dummys'

export default function Game() {
  const roomId: any = useParams().gameId
  const { nickname } = useSelector((state: any) => state.currentUser)
  const email = useSelector((state: any) => state.email)
  const [isStarted, setIsStarted] = useState(false)

  let stompClient = useWebSocket({
    email,
    roomId,
    onConnect(frame, client) {
      client.subscripbe(`join`) // 방 안 사람 추가 혹은 제거. 결과 받으면 들어왔다고 채팅

      // client.subscripbe(`all`) // game정보 모두 받기

      client.subscripbe(`start`) // 게임 시작

      client.subscripbe(`table`) // 초기 소유 카드

      client.subscripbe(`teller`) // 텔러 맞추는 단계로 바꾸기

      client.subscripbe(`item`) // 아이템에 따라 효과 발동시키기

      client.subscripbe(`draw`) // 카드 덱 채워넣기

      client.subscripbe(`result`) // 유저 점수 갱신

      client.subscripbe(`end`) // 게임 최종 결과창으로

      client.subscripbe(`newteller`) // 다음턴
    },
    beforeDisconnect() {}, // 나간다고 채팅
  })

  return (
    <div css={roomBg}>
      <div css={head}>
        <RoomInfo
          room={roomsDummy.num}
          name={roomsDummy.name}
          pw={roomsDummy.pw}
          people={roomsDummy.people}
          max={roomsDummy.max}
          method={roomsDummy.method}
        />
        <Setting />
      </div>

      <div>{isStarted ? <GamePlay></GamePlay> : <GameRoom></GameRoom>}</div>

      <Chat />
    </div>
  )
}

const roomBg = css({
  // backgroundImage: 'linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)',
  backgroundImage: 'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
  backgroundSize: 'cover',
})
const head = css({
  display: 'flex',
  justifyContent: 'space-between',
})
