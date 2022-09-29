import { useEffect, useState } from 'react'
import * as Stomp from '@stomp/stompjs'
import Sockjs from 'sockjs-client'

// interface Param {
//   onConnect: (frame: Stomp.Frame, client: Stomp.Client) => void
//   beforeDisconnected: (frame: Stomp.Frame, client: Stomp.Client) => void
//   reconnectDelay?: number
// }

export const useWebSocket = (params: any) => {
  let stompClient

  useEffect(() => {
    stompClient = new Stomp.Client({
      connectHeaders: { Authorization: params.email },
      reconnectDelay: params.reconnectDelay ? params.reconnectDelay : 5000,
      onConnect: (frame) => {
        console.log('연결 성공', frame)
        params.onConnect(frame, stompClient!) // 느낌표는 typescript에서 null이 아님을 명시
      },
      onDisconnect: (frame) => {
        console.log('연결 끊음', frame)
        params.beforeDisconnected(frame, stompClient!)
      },
      logRawCommunication: false,
    })
    stompClient.webSocketFactory = () =>
      new Sockjs(`http://j509.p.ssafy.io/api/v1/socket/room/${params.roomId}/`)
    stompClient.activate()

    return () => {
      stompClient?.deactivate()
    }
  }, [])

  return stompClient
}
