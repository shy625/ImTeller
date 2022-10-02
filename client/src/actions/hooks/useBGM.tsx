import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBgmSrc } from 'store/modules/util'

export const useBGM = (src: any) => {
	const dispatch = useDispatch()

	const bgm = {
		main: 'assets/audio/main.mp3',
		gameList: 'assets/audio/gameList.mp3',
		game: 'assets/audio/game/mp3',
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
