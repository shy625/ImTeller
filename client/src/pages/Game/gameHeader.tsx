/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

import RoomInfo from 'components/roomInfo'
import Setting from 'components/setting'

export default function GameHeader(props: any) {
  // 본인카드 나열, teller면 본인카드랑 그림 묘사 적어서 제출
  // teller 아니면 그림묘사어 생길때까지 기다리다가 선택해서 제출
  const { setState } = props

  return (
    <div css={headerCSS}>
      <RoomInfo />
      <Setting />
    </div>
  )
}

const headerCSS = css({
  display: 'flex',
  justifyContent: 'space-between',
})
