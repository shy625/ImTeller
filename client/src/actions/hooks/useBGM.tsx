import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBgmSrc, setIsBgmOn, setVolume } from 'store/modules/setting'

export const useBGM = (props: any) => {
  const dispatch = useDispatch()
  const isBgmOn = useSelector((state: any) => state.isBgmOn)

  useEffect(() => {
    if (props.src) {
      dispatch(setBgmSrc(props.src))
    }

    return () => {
      dispatch(setBgmSrc('assets/audio/mainBgm.mp3'))
    }
  }, [])

  const playPause = () => {
    dispatch(setIsBgmOn(!isBgmOn))
  }
  const volumeControl = (volume) => {
    dispatch(setVolume(volume / 100))
  }
  return [playPause, volumeControl]
}
