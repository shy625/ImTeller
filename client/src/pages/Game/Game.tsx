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
	setReady,
	setPlayers,
	setGameCards,
	setTime,
	setDescription,
	setTable,
	setResult,
	setTeller,
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

	const [ws, setWs] = useState<any>('')
	const [state, setState] = useState(0) // 0 이면 gameRoom, 1이면 gamePlay, 2이면 gameResult
	const [phase, setPhase] = useState(0) // state가 1일때 작동. 1: 텔러 2: 낚시그림선택 3: 텔러맞추기 4: 결과
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
				console.log('join', content)
			})
			client.subscribe(`/sub/room/${roomId}/exit`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setRoomInfo(content))
				console.log('exit', content)
			})
			// 레디 상태 변경
			client.subscribe(`/sub/room/${roomId}/ready`, (action) => {
				const content = JSON.parse(action.body)
				dispatch(setReady(content))
				console.log('ready', content)
			})
			// 시작시 선택카드 제출
			client.subscribe(`/sub/room/${roomId}/start`, (action) => {
				console.log('start', action.body)
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
			// 내 아이템 받기
			client.subscribe(
				`/user/${roomInfo.userSessionIds[nickname]}/room/${roomId}/item`,
				(action) => {
					console.log('myitem', action.body)
					const content = JSON.parse(action.body)
					console.log('myitem', content)
				},
			)
			// 내 패 최신화
			client.subscribe(
				`/user/${roomInfo.userSessionIds[nickname]}/room/${roomId}/mycards`,
				(action) => {
					console.log('mycards', action.body)
					const content = JSON.parse(action.body)
					console.log('mycards', content)
				},
			)
			// 페이즈 전환
			client.subscribe(`/sub/room/${roomId}/phase`, (action) => {
				if (action.body === 'phase1') {
					setState(1)
					setPhase(1)
					dispatch(setTeller(''))
					dispatch(setDescription(''))
					dispatch(setTime(30))
				} else if (action.body === 'phase2') {
					setState(1)
					setPhase(2)
					dispatch(setTime(30))
				} else if (action.body === 'phase3') {
					setState(1)
					setPhase(3)
					dispatch(setTime(30))
				} else if (action.body === 'phase4') {
					setState(1)
					setPhase(4)
					dispatch(setTime(30))
				} else {
					setState(2)
					setPhase(0)
				}
			})
			// 유저 상태 변화
			client.subscribe(`/sub/room/${roomId}/status`, (action) => {
				const content = JSON.parse(action.body)
				console.log('status', content)
			})
			// 텔러 누군지 받기
			client.subscribe(`/sub/room/${roomId}/newteller`, (action) => {
				console.log('newTeller', action.body)
				dispatch(setTeller(action.body))
			})
			// 텔러 문구 받기
			client.subscribe(`/sub/room/${roomId}/teller`, (action) => {
				console.log('teller', action.body)
				const content = JSON.parse(action.body)
				dispatch(setDescription(content))
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
			})
			client.subscribe(`/sub/room/${roomId}/totalresult`, (action) => {
				const content = JSON.parse(action.body)
				console.log('totalresult', content)
			})
			client.subscribe(`/sub/room/${roomId}/submitcards`, (action) => {
				const content = JSON.parse(action.body)
				console.log('submitcards', content)
			})
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
		setModalState('joinRoom')
		return () => {
			dispatch(setIsChecked(false))
		} // 새로고침되면 roomInfo 받기
	}, [roomId])

	return (
		<main css={roomBg}>
			<div>
				<GameHeader />
			</div>

			<div css={players}>
				{players.map((player: any) => (
					<div key={player.nickname} css={playerOne}>
						<GameProfile player={player} phase={phase} />
					</div>
				))}
			</div>

			<div>
				{state === 0 ? (
					<GameRoom nickname={nickname} client={ws} roomId={roomId} />
				) : state === 1 ? (
					phase === 1 || phase === 2 ? (
						<GameTeller nickname={nickname} phase={phase} client={ws} roomId={roomId} />
					) : phase === 3 ? (
						<GameChoice nickname={nickname} phase={phase} client={ws} roomId={roomId} />
					) : (
						<GameResult phase={phase} turnResult={turnResult} submitCards={submitCards} />
					)
				) : (
					<GameEnd />
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
