/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import { setModalState } from 'store/modules/util'

export default function CardSelectModal(props: any) {
  const dispatch = useDispatch()

  return (
    <div>
      CardSelectModal
      <button onClick={() => dispatch(setModalState(''))}>취소</button>
    </div>
  )
}
