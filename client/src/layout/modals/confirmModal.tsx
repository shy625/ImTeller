import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import { setModalState, setModalMsg, setModalResult } from 'store/modules/util'

export default function ConfirmModal(props: any) {
  // const dispatch = useDispatch()

  // const modalMsg = useSelector((state: any) => state.modalMsg)

  // useEffect(() => {
  //   return () => {
  //     dispatch(setModalMsg(''))
  //   }
  // }, [])

  // const onCancle = () => {
  //   dispatch(setModalResult(false))
  //   dispatch(setModalState(''))
  // }
  // const onConfirm = () => {
  //   dispatch(setModalResult(true))
  //   dispatch(setModalState(''))
  // }

  return (
    <div>
      {/* {modalMsg}
      <button onClick={onCancle}>취소</button>
      <button onClick={onConfirm}>확인</button> */}
    </div>
  )
}
