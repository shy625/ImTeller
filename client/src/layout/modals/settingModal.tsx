import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import {
	setIsBgmOn,
	setBgmVolume,
	setIsEffectOn,
	setEffectVolume,
	setIsMouseEffectOn,
	setModalState,
} from 'store/modules/util'

export default function SettingModal(props: any) {
	const dispatch = useDispatch()

	const isChecked = useSelector((state: any) => state.isChecked) // 게임 진행중인지
	const isBgmOn = useSelector((state: any) => state.isBgmOn)
	const bgmVolume = useSelector((state: any) => state.bgmVolume)
	const isEffectOn = useSelector((state: any) => state.isEffectOn)
	const effectVolume = useSelector((state: any) => state.effectVolume)
	const isMouseEffectOn = useSelector((state: any) => state.isMouseEffectOn)

	const [settings, setSettings] = useState<any>({})

	useEffect(() => {
		setSettings({
			isBgmOn,
			bgmVolume,
			isEffectOn,
			effectVolume,
			isMouseEffectOn,
		})
	}, [])

	const onCancle = () => {
		dispatch(setIsBgmOn(settings.isBgmOn))
		dispatch(setBgmVolume(settings.bgmVolume))
		dispatch(setIsEffectOn(settings.isEffectOn))
		dispatch(setEffectVolume(settings.effectVolume))
		dispatch(setIsMouseEffectOn(settings.isMouseEffectOn))
		dispatch(setModalState(''))
	}

	return (
		<div css={makeRoomModalCSS}>
			<div className="openModal modal">
				<section>
					<header>사이트 설정</header>
					<main>
						<label htmlFor="isBgmOn">배경음악 재생</label>
						<div id="isBgmOn">
							<div
								onClick={() => dispatch(setIsBgmOn(true))}
								style={isBgmOn ? { backgroundColor: '#d1e4ff', color: '#1b5198' } : null}
							>
								On
							</div>
							<div
								onClick={() => dispatch(setIsBgmOn(false))}
								style={!isBgmOn ? { backgroundColor: '#d1e4ff', color: '#1b5198' } : null}
							>
								Off
							</div>
						</div>
						<label htmlFor="bgmVolume">배경음악 볼륨</label>
						<input
							type="range"
							id="bgmVolume"
							min="0"
							max="100"
							step="1"
							value={bgmVolume}
							onChange={(e) => {
								dispatch(setBgmVolume(e.target.value))
							}}
						/>
						<hr />
						<label htmlFor="isEffectOn">효과음 재생</label>
						<div id="isEffectOn">
							<div
								onClick={() => dispatch(setIsEffectOn(true))}
								style={isEffectOn ? { backgroundColor: '#d1e4ff', color: '#1b5198' } : null}
							>
								On
							</div>
							<div
								onClick={() => dispatch(setIsEffectOn(false))}
								style={!isEffectOn ? { backgroundColor: '#d1e4ff', color: '#1b5198' } : null}
							>
								Off
							</div>
						</div>
						<label htmlFor="effectVolume">효과음 볼륨</label>
						<input
							type="range"
							id="effectVolume"
							min="0"
							max="100"
							step="1"
							value={effectVolume}
							onChange={(e) => {
								dispatch(setEffectVolume(e.target.value))
							}}
						/>
						<hr />
						<label htmlFor="isMouseEffectOn">마우스 효과음</label>
						<div id="isMouseEffectOn">
							<div
								onClick={() => dispatch(setIsMouseEffectOn(true))}
								style={isMouseEffectOn ? { backgroundColor: '#d1e4ff', color: '#1b5198' } : null}
							>
								On
							</div>
							<div
								onClick={() => dispatch(setIsMouseEffectOn(false))}
								style={!isMouseEffectOn ? { backgroundColor: '#d1e4ff', color: '#1b5198' } : null}
							>
								Off
							</div>
						</div>
					</main>
					<footer>
						<button onClick={onCancle}>취소</button>
						<button onClick={() => dispatch(setModalState(''))}>확인</button>
					</footer>
				</section>
			</div>
			<label htmlFor="bgmVolume">배경음악 볼륨</label>
			<input
				type="range"
				id="bgmVolume"
				min="0"
				max="100"
				step="1"
				value={bgmVolume}
				onChange={(e) => {
					dispatch(setBgmVolume(e.target.value))
				}}
			/>
			<hr />
			<label htmlFor="isEffectOn">효과음 재생</label>
			<div id="isEffectOn">
				<div
					onClick={() => dispatch(setIsEffectOn(true))}
					style={isEffectOn ? { backgroundColor: 'white' } : null}
				>
					On
				</div>
				<div
					onClick={() => dispatch(setIsEffectOn(false))}
					style={!isEffectOn ? { backgroundColor: 'white' } : null}
				>
					Off
				</div>
			</div>
			<label htmlFor="effectVolume">효과음 볼륨</label>
			<input
				type="range"
				id="effectVolume"
				min="0"
				max="100"
				step="1"
				value={effectVolume}
				onChange={(e) => {
					dispatch(setEffectVolume(e.target.value))
				}}
			/>
			<hr />
			<label htmlFor="isMouseEffectOn">마우스 효과</label>
			<div id="isMouseEffectOn">
				<div
					onClick={() => dispatch(setIsMouseEffectOn(true))}
					style={isMouseEffectOn ? { backgroundColor: 'white' } : null}
				>
					On
				</div>
				<div
					onClick={() => dispatch(setIsMouseEffectOn(false))}
					style={!isMouseEffectOn ? { backgroundColor: 'white' } : null}
				>
					Off
				</div>
			</div>
			<hr />
			<button onClick={onCancle}>취소</button>
			<button onClick={() => dispatch(setModalState(''))}>확인</button>
		</div>
	)
}
