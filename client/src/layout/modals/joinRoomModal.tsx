import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import game from 'actions/api/game'
import { setModalState } from 'store/modules/util'
import { setIsChecked } from 'store/modules/game'

export default function JoinRoomModal(props: any) {
	const navigate: any = useNavigate()
	const dispatch = useDispatch()

	const [password, setPassword] = useState('')
	const [authError, setAuthError] = useState('')

	const path = window.location.pathname
	let roomId
	if (!path.includes('/game/')) {
		roomId = 0
	} else {
		roomId = path.split('/').slice(-1)[0]
	}

	useEffect(() => {
		if (!roomId) {
			dispatch(setModalState(''))
			navigate(-1, { replace: true })
		} else {
			onSubmit()
		}
	}, [roomId])

	const onSubmit = () => {
		setAuthError('')
		game
			.join(roomId, { password })
			.then((result) => {
				if (!result.data.response) return setAuthError('잘못된 비밀번호입니다')
				dispatch(setIsChecked(true))
				dispatch(setModalState(''))
			})
			.catch((error) => {
				setAuthError('잘못된 접근입니다')
			})
	}

	return (
		<div css={joinRoomModalCSS}>
			<div className="openModal modal">
				<section>
					<header>방 입장하기</header>
					<main>
						<div>{authError}</div>
						<input onChange={(e) => setPassword(e.target.value)} type="password" autoFocus />
					</main>
					<footer>
						<button
							onClick={() => {
								dispatch(setModalState(''))
								navigate(-1, { replace: true })
							}}
						>
							취소
						</button>
						<button onClick={onSubmit}>입장</button>
					</footer>
				</section>
			</div>
		</div>
	)
}
