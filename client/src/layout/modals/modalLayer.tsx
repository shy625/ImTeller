import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import MakeRoomModal from 'layout/modals/makeRoomModal'
import CardSelectModal from 'layout/modals/cardSelectModal'
import AlertModal from 'layout/modals/alertModal'
import ConfirmModal from 'layout/modals/confirmModal'

export default function ModalLayer(props: any) {
  const modalState = useSelector((state: any) => state.modalState)

  const Modals = {
    makeRoom: <MakeRoomModal />,
    cardSelect: <CardSelectModal />,
    alertModal: <AlertModal />,
    confirmModal: <ConfirmModal />,
  }

  return (
    <div>
      {props.children}
      {console.log(modalState)}
      <ModalST>{modalState ? Modals[modalState] : null}</ModalST>
    </div>
  )
}
const ModalST = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`
