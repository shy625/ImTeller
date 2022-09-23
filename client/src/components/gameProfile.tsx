/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import defaultProfile from '../assets/image/defaultProfile.png'

export default function GameProfile(props: any) {
  return (
    <div css={profile}>
      <img css={imgSize} src={defaultProfile} alt="프로필이미지" />
      <div>{props.name}</div>
    </div>
  )
}
const imgSize = css({
  borderRadius: '100%',
  width: '8em',
  objectFit: 'cover',
})

const profile = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})
