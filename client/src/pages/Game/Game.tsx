/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import RoomInfo from 'components/roomInfo'
import Setting from 'components/setting'
import Chat from 'components/chat'

import GameTeller from 'pages/Game/gameTeller'
import GameChoice from 'pages/Game/gameChoice'
import GameResult from 'pages/Game/gameResult'
import GameRoom from 'pages/Game/gameRoom'
import GameEnd from 'pages/Game/gameEnd'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import {
  setPlayers,
  setCards,
  setTime,
  addCard,
  setDescription,
  setTable,
  setEndResult,
} from 'store/modules/game'

export default function Game() {
  const dispatch = useDispatch()
  const roomId = useParams().gameId
  const { nickname } = useSelector((state: any) => state.currentUser)
  const email = useSelector((state: any) => state.email)

  const [state, setState] = useState(0) // 0 이면 gameRoom, 1이면 gamePlay, 2면 gameEnd
  const [turn, setTurn] = useState(0) // 0이면 teller 단계(텔러면 문장 적기, 아니면 유사 그림 선택), 1이면 choice단계, 2면 result단계
  const [selectedCard, setSelectedCard] = useState([])
  const [imteller, setImteller] = useState(false)
  const [result, setResult] = useState([])

  const mainComponent = () => {
    if (state === 0) return <GameRoom stompClient={stompClient} />
    if (state === 1) {
      if (turn === 0)
        return (
          <GameTeller stompClient={stompClient} imteller={imteller} setImteller={setImteller} />
        )
      if (turn === 1) return <GameChoice stompClient={stompClient} />
      if (turn === 2) return <GameResult result={result} />
    }
    if (state === 2) return <GameEnd />
  }

  let stompClient = useWebSocket({
    email,
    roomId,
    onConnect(frame, client) {
      // 서버와 다른 사용자들에게 들어왔음을 알림
      client.publish({
        destination: 'join',
        body: JSON.stringify({
          nickname: nickname,
          state: 1,
        }),
      })

      // 다른 플레이어들 상태 변경
      client.subscribe(`join`, (action) => {
        const content = JSON.parse(action.body)
        dispatch(setPlayers(content))
      })

      // 방장이 시작하고 서버에서 시작한다는 요청이 오면 선택했던 카드들 보내기. 보내면서 아이템 넣기
      client.subscribe(`start`, (action) => {
        client.publish({
          destination: 'select',
          body: JSON.stringify({
            nickname,
            selectedCard,
          }),
        })
      })

      // 서버에서 카드 나눠주면 게임 시작
      client.subscribe(`table`, (action) => {
        const content = JSON.parse(action.body)
        dispatch(setCards(content))
        setState(1)
        setTurn(0)
      })

      // 새 텔러 받으면 새 턴 시작
      client.subscribe('newteller', (action) => {
        const content = JSON.parse(action.body)
        setState(1)
        setTurn(0)
        if (content.nickname === nickname) {
          setImteller(true)
        }
      })

      // 텔러가 그림 묘사를 완료하면 그때부터 20초간 낚시그림 선택
      client.subscribe(`teller`, (action) => {
        const content = JSON.parse(action.body)
        dispatch(setDescription(content.cardMsg))
        dispatch(setTime(20))
      })

      // 모두 낚시그림 선택하고 서버가 모아서 보내주면 텔러그림찾기 시작
      client.subscribe(`others`, (action) => {
        const content = JSON.parse(action.body)
        dispatch(setTable(content.cardList))
        dispatch(setTime(content.time ? content.time : 45))
        setTurn(1)
      })

      // 아이템에 따라 효과 발동시키기
      client.subscribe(`item`, (action) => {
        const content = JSON.parse(action.body)
        console.log(content)
      })

      // 카드 덱 채워넣기
      client.subscribe(`draw`, (action) => {
        const content = JSON.parse(action.body)
        dispatch(addCard(content))
      })

      // 유저 점수 갱신
      client.subscribe(`result`, (action) => {
        const content = JSON.parse(action.body)
        setResult(content.result)
        setTurn(2)
        setTimeout(() => {
          setTurn(0)
        }, 10000)
      })

      // 게임 최종 결과창으로
      client.subscribe(`end`, (action) => {
        const content = JSON.parse(action.body)
        dispatch(setEndResult(content.result))
        setState(2)
        setTimeout(() => {
          setTurn(0)
        }, 12000)
      })
    },
    beforeDisconnect(frame, client) {
      client.publish({
        destination: 'join',
        body: JSON.stringify({
          nickname: nickname,
          state: 0,
        }),
      })
    },
  })

  return (
    <div css={roomBg}>
      <div css={head}>
        <RoomInfo />
        <Setting />
      </div>

      <div>{mainComponent()}</div>

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
