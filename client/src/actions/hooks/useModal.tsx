import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setModalState, setModalMsg, setModalResult } from 'store/modules/setting'

export const useModal = () => {
  return [setModalState, setModalMsg, setModalResult]
}
