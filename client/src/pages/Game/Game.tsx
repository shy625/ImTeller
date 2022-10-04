/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import GameHeader from 'pages/Game/gameHeader'
import GameTeller from 'pages/Game/gameTeller'
import GameChoice from 'pages/Game/gameChoice'
import GameResult from 'pages/Game/gameResult'
import GameRoom from 'pages/Game/gameRoom'
import GameEnd from 'pages/Game/gameEnd'
import Chat from 'components/chat'
import GameProfile from 'components/gameProfile'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import { useModal } from 'actions/hooks/useModal'
import {
	setIsChecked,
	setRoomInfo,
	setReady1,
	setReady2,
	setPlayers,
	setScore,
	setStatus,
	clearStatus,
	setGameCards,
	setTime,
	setPhase,
	setTable,
	setResult,
	setTeller,
	setTellerMsg,
} from 'store/modules/game'
import art from 'actions/api/art'
import { useBGM } from 'actions/hooks/useBGM'

export default function Game() {
	const dispatch = useDispatch()
	const { roomId } = useParams()

	const { nickname } = useSelector((state: any) => state.currentUser)
	const email = useSelector((state: any) => state.email)
	const players = useSelector((state: any) => state.players)
	const selectedCard = useSelector((state: any) => state.selectedCards)
	const roomInfo = useSelector((state: any) => state.roomInfo)
	const phase = useSelector((state: any) => state.phase) // state가 1일때 작동. 1: 텔러 2: 낚시그림선택 3: 텔러맞추기 4: 결과

	const [ws, setWs] = useState<any>('')
	const [state, setState] = useState(0) // 0 이면 gameRoom, 1이면 gamePlay, 2이면 gameResult
	const [turnResult, setTurnResult] = useState<any>([])
	const [submitCards, setSubmitCards] = useState<any>([])

	const [setModalState, setModalMsg] = useModal('')

	useBGM('game')

	// 새로고침 방지
	const blockRefresh = (event) => {
		event.preventDefault()
		event.returnValue = ''
	}
	useEffect(() => {
		window.addEventListener('beforeunload', blockRefresh)
		art
			.cardList({ nickname })
			.then((result) => {
				dispatch(setGameCards(result.data.response))
			})
			.catch((error) => {
				console.error(error)
			})
		return () => {
			window.removeEventListener('beforeunload', blockRefresh)
		}
	}, [])

	useEffect(() => {
		setModalState('joinRoom')
		return () => {
			dispatch(setIsChecked(false))
		} // 새로고침되면 roomInfo 받기
	}, [roomId])

	// 웹소켓
	useEffect(() => {
		const client = useWebSocket({ email })
		client.onConnect = () => {
			client.publish({
				destination: `/pub/room/${roomId}/join`,
				body: JSON.stringify({ nickname }),
			})
			// 출입에 따라 방정보 변경
			client.subscribe(`/sub/room/${roomId}/join`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setRoomInfo(content))
				dispatch(setPlayers(content))
				console.log('join', content)
			})
			client.subscribe(`/sub/room/${roomId}/exit`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setRoomInfo(content))
				dispatch(setPlayers(content))
				console.log('exit', content)
			})
			// 레디 상태 변경
			client.subscribe(`/sub/room/${roomId}/ready`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setReady1(content))
				dispatch(setReady2(content))
				console.log('ready', content)
			})
			// 시작시 선택카드 제출
			client.subscribe(`/sub/room/${roomId}/start`, (action) => {
				console.log('start', action.body)
				console.log('selectedCard', selectedCard)
				const content = JSON.parse(action.body)
				if (!content) return
				client.publish({
					destination: `/pub/room/${roomId}/select`,
					body: JSON.stringify({
						nickname,
						selectedCard,
					}),
				})
				client.publish({
					destination: `/pub/room/${roomId}/roominfo`,
				})
			})
			// 페이즈 전환
			client.subscribe(`/sub/room/${roomId}/phase`, (action) => {
				console.log(action.body)
				dispatch(setTime(0))
				dispatch(setPhase(action.body))
			})
			// 유저 상태 변화
			client.subscribe(`/sub/room/${roomId}/status`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setStatus(content))
			})
			// 텔러 누군지 받기
			client.subscribe(`/sub/room/${roomId}/newteller`, (action: any) => {
				console.log('newTeller', action.body)
				dispatch(setTeller(action.body))
			})
			// 텔러 문구 받기
			client.subscribe(`/sub/room/${roomId}/teller`, (action) => {
				console.log('teller', action.body)
				dispatch(setTellerMsg(action.body))
			})
			// 테이블 받기
			client.subscribe(`/sub/room/${roomId}/table`, (action) => {
				const content = JSON.parse(action.body)
				console.log('table', content)
				dispatch(setTable(content))
			})
			// 누군가 아이템 사용
			client.subscribe(`/sub/room/${roomId}/item`, (action) => {
				const content = JSON.parse(action.body)
				console.log('item', content)
			})
			// 결과 받기
			client.subscribe(`/sub/room/${roomId}/result`, (action) => {
				const content = JSON.parse(action.body)
				console.log('result', content)
				setTurnResult(content)
			})
			client.subscribe(`/sub/room/${roomId}/totalresult`, (action) => {
				const content = JSON.parse(action.body)
				console.log('totalresult', content)
				dispatch(setScore(content))
				dispatch(setResult(content))
			})
			client.subscribe(`/sub/room/${roomId}/submitcards`, (action) => {
				const content = JSON.parse(action.body)
				console.log('submitcards', content)
				setSubmitCards(content)
			})
			// 새로고침
			client.subscribe(`/sub/room/${roomId}/roominfo`, (action) => {
				const content = JSON.parse(action.body)
				console.log('roominfo', content)
			})
		}
		client.activate()
		setWs(client)
		return () => {
			client.publish({
				destination: `/pub/room/${roomId}/exit`,
				body: JSON.stringify({ nickname }),
			})
			client.deactivate()
		}
	}, [])

	useEffect(() => {
		try {
			// 내 패 받기
			ws.subscribe(
				`/user/${roomInfo.userSessionIds[nickname]}/room/${roomId}/mycards`,
				(action) => {
					const content = JSON.parse(action.body)
					console.log('mycards', content)
					dispatch(setGameCards(content))
				},
			)
			// 내 아이템 받기
			ws.subscribe(`/user/${roomInfo.userSessionIds[nickname]}/room/${roomId}/item`, (action) => {
				console.log('myitem', action.body)
				const content = JSON.parse(action.body)
				console.log('myitem', content)
			})
		} catch {}
	}, [roomInfo.ready, phase])

	useEffect(() => {
		console.log(phase)
		if (phase === 'phase1') {
			if (phase !== 'end') {
				setState(1)
				dispatch(setTeller(''))
				dispatch(clearStatus())
				dispatch(setTime(30))
			}
		} else if (phase === 'phase2') {
			setState(1)
			dispatch(setTime(30))
		} else if (phase === 'phase3') {
			setState(1)
			dispatch(clearStatus())
			dispatch(setTime(30))
		} else if (phase === 'phase4') {
			setState(1)
			dispatch(setTime(10))
		} else if (phase === 'end') {
			setState(2)
			dispatch(setTime(15))
		}
	}, [phase])

	return (
		<main css={roomBg}>
			<div>
				<GameHeader />
			</div>

			<div css={players}>
				{players.map((player: any) => (
					<div key={player.nickname} css={playerOne}>
						<GameProfile player={player} />
					</div>
				))}
			</div>

			<div>
				{state === 0 ? (
					<GameRoom nickname={nickname} client={ws} roomId={roomId} />
				) : state === 1 ? (
					phase === 'phase1' || phase === 'phase2' ? (
						<GameTeller nickname={nickname} client={ws} roomId={roomId} />
					) : phase === 'phase3' ? (
						<GameChoice nickname={nickname} client={ws} roomId={roomId} />
					) : (
						<GameResult turnResult={turnResult} submitCards={submitCards} />
					)
				) : (
					<GameEnd setState={setState} />
				)}
			</div>

			<div>
				<Chat />
			</div>
		</main>
	)
}

const roomBg = css({
	// backgroundImage: 'linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)',
	backgroundImage: 'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
	backgroundSize: 'cover',
})

const players = css({
	display: 'flex',
	justifyContent: 'space-evenly',
	flexWrap: 'wrap',
	width: '65%',
})

const playerOne = css({
	margin: '10px',
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: '20%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})
