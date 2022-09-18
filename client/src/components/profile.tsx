import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Profile(props: any) {
  const navigate = useNavigate()
  const { nickname, profile } = props

  return (
    <div
      onClick={() => {
        navigate(`/mypage/${nickname}`)
      }}
    >
      <img src={profile} alt="" />
      {nickname}
    </div>
  )
}
