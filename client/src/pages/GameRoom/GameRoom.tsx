import React from 'react'
import { useParams } from 'react-router-dom'

export default function GameRoom() {
  const roomId: any = useParams().gameId

  return <div>{roomId} 대기실입니다</div>
}
