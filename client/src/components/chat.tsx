/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
export default function Chat() {
  return <div css={chat}>chat</div>
}
const chat = css({
  border: '1px solid black',
  width: '20em',
  height: '50em',
})
