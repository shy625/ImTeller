/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'

import { useBGM } from 'actions/hooks/useBGM'
import setting from '../assets/image/setting.png'

const Setting = () => {
  const [playPause, volumeControl] = useBGM('assets/audio/gameBgm.mp3')

  return (
    <div>
      <img css={imgSize} src={setting} alt="setting" />
    </div>
  )
}
export default Setting

const imgSize = css({
  width: '2em',
  margin: 10,
})
