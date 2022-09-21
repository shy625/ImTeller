import React from 'react'
import { useParams } from 'react-router-dom'

import RoomInfo from '@components/roomInfo'
// 여기서 이제 socket 연결이 시작되는거지
export default function GameRoom() {
  const roomId: any = useParams().gameId

  return <div>{roomId} 대기실입니다</div>
}
