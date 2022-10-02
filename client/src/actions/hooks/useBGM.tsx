import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBgmSrc } from 'store/modules/util'

export const useBGM = (src: any) => {
	const dispatch = useDispatch()
	const isBgmOn = useSelector((state: any) => state.isBgmOn)

	const bgm = {
		main: 'assets/audio/mainBgm.mp3',
		gameList: 'assets/audio/gameListBgm.mp3',
		game: 'assets/audio/gameBgm/mp3',
	}

	useEffect(() => {
		if (src) {
			dispatch(setBgmSrc(bgm[src]))
		}
		return () => {
			dispatch(setBgmSrc(bgm['main']))
		}
	}, [])
}
