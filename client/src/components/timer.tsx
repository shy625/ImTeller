import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTimer, reduceTime } from 'store/modules/game'

export default function Timer(props: any) {
  const dispatch = useDispatch()

  const timer = useSelector((state: any) => state.timer)

  useEffect(() => {
    dispatch(setTimer(props.startTime))
    setInterval(() => {
      dispatch(reduceTime())
    }, 1000)
  }, [])

  return <div>{timer ? <div>🕑{timer}</div> : <div>🕛시간종료!</div>}</div>
}

// 새로고침 문제를 해결하지 못함. 결론은 ws 써야함
