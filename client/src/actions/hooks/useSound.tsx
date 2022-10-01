import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEffectSrc } from 'store/modules/util'

export const useSound = (src: any) => {
  const dispatch = useDispatch()
  const isEffectOn = useSelector((state: any) => state.isEffectOn)

  const effect = {
    main: 'assets/audio/mainBgm.mp3',
    gameList: 'assets/audio/gameListBgm.mp3',
    game: 'assets/audio/gameBgm/mp3',
  }

  useEffect(() => {
    if (src) {
      dispatch(setEffectSrc(effect[src]))
    }
    return () => {
      dispatch(setEffectSrc(effect['main']))
    }
  }, [])
}
