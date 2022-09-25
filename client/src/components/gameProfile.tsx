/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import defaultProfile from '../assets/image/defaultProfile.png'

export default function GameProfile(props: any) {
  const { nickname, profile } = props.player
  return (
    <div css={profileCSS}>
      <img css={imgSize} src={profile || defaultProfile} alt="프로필이미지" />
      <div>{nickname}</div>
    </div>
  )
}
const imgSize = css({
  borderRadius: '100%',
  width: '8em',
  objectFit: 'cover',
})

const profileCSS = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})
