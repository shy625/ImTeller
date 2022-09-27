import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import game from 'actions/api/game'
import { setModalState } from 'store/modules/setting'
import { setRoomInfo } from 'store/modules/game'

export default function JoinRoomModal(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLocked = useSelector((state: any) => state.modalMsg)
  const [roomPw, setRoomPw] = useState('')
  const [authError, setAuthError] = useState('')

  const path = window.location.pathname
  let roomId
  if (!path.includes('/game/')) {
    roomId = 0
  } else {
    roomId = path.split('/').slice(-1)[0]
  }

  useEffect(() => {
    if (!roomId) {
      dispatch(setModalState(''))
      navigate('/game')
    } else if (!isLocked) {
      onSubmit()
    }
  }, [roomId])

  const onSubmit = () => {
    setAuthError('')
    const data = { roomPw: isLocked ? roomPw : '' }
    game
      .join(roomId, data)
      .then((result) => {
        if (!result.data.roomId) return setAuthError('잘못된 비밀번호입니다')
        dispatch(setRoomInfo(result.data))
        dispatch(setModalState(''))
      })
      .catch((error) => {
        setAuthError('잘못된 접근입니다')
      })
    dispatch(setModalState('')) // API 구현되면 지우기
  }

  return (
    <div>
      <input onChange={(e) => setRoomPw(e.target.value)} type="password" />
      {authError}
      <button onClick={onSubmit}>입장</button>
      <button
        onClick={() => {
          dispatch(setModalState(''))
          navigate('/game')
        }}
      >
        취소
      </button>
    </div>
  )
}
