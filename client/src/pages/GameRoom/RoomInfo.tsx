/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
const RoomInfo = (props: any) => {
  const navigate = useNavigate()
  return (
    <div css={infos}>
      <div css={backBtn} onClick={() => navigate(-1)}>
        ←
      </div>
      <div>{props.room}</div>
      <div>{props.name}</div>
      <div>{props.pw === '' ? '공개' : '비공개'}</div>
      <div>{props.method}</div>
      <div>
        {props.people} / {props.max}
      </div>
    </div>
  )
}
export default RoomInfo

const infos = css({
  display: 'flex',
})

const backBtn = css({
  cursor: 'pointer',
})
