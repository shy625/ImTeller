import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setModalState, setModalMsg } from 'store/modules/util'

export const useModal = (modalMsg = '') => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setModalMsg(modalMsg))
  }, [])

  const setState = (action: any) => {
    dispatch(setModalState(action))
  }
  const setMsg = (action: any) => {
    dispatch(setModalMsg(action))
  }

  return [setState, setMsg]
}
