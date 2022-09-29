import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setModalState, setModalMsg } from 'store/modules/setting'

export const useModal = () => {
  const dispatch = useDispatch()

  const setState = (action: any) => {
    dispatch(setModalState(action))
  }
  const setMsg = (action: any) => {
    dispatch(setModalMsg(action))
  }

  return [setState, setMsg]
}
