import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { setModalState, setModalMsg } from 'store/modules/setting'

export default function AlertModal(props: any) {
  const dispatch = useDispatch()
  const modalMsg = useSelector((state: any) => state.modalMsg)
  return (
    <div className="modal">
      {modalMsg}
      <button
        onClick={() => {
          dispatch(setModalState(''))
          setModalMsg('')
        }}
      >
        확인
      </button>
    </div>
  )
}
