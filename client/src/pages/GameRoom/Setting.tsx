/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import setting from '../../assets/image/setting.png'

const Setting = () => {
  return (
    <div>
      <img css={imgSize} src={setting} alt="setting" />
    </div>
  )
}
export default Setting

const imgSize = css({
  width: '2em',
})
