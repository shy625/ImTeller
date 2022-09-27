import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setModalState, setModalMsg, setModalResult } from 'store/modules/setting'

export const useModal = () => {
  const dispatch = useDispatch()
  const modalResult = useSelector((state: any) => state.modalResult)

  useEffect(() => {
    dispatch(setModalResult(''))
    return () => {
      dispatch(setModalState(''))
    }
  }, [])

  return [setModalState, setModalMsg]
}
