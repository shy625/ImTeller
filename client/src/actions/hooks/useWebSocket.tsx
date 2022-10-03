import { useEffect, useState } from 'react'
import * as Stomp from '@stomp/stompjs'
import Sockjs from 'sockjs-client'

// interface Param {
//   onConnect: (frame: Stomp.Frame, client: Stomp.Client) => void
//   beforeDisconnected: (frame: Stomp.Frame, client: Stomp.Client) => void
//   reconnectDelay?: number
// }

export const useWebSocket = (params: any) => {
	const stompClient = new Stomp.Client({
		connectHeaders: { Authorization: params.email },
		reconnectDelay: params.reconnectDelay ? params.reconnectDelay : 5000,
		logRawCommunication: false,
	})
	stompClient.webSocketFactory = () => new Sockjs(`https://j7a509.p.ssafy.io:8080/api/v1/socket`)

	return stompClient
}

// let stompClient = useWebSocket({
// 	email,
// 	onConnect(frame, client) {
// 		// 서버와 다른 사용자들에게 들어왔음을 알림
// 		client.publish({
// 			destination: `/pub/room/${roomId}/join`,
// 			body: JSON.stringify({
// 				nickname,
// 			}),
// 		})

// 		// 다른 플레이어들 상태 변경
// 		client.subscribe(`/sub/room/${roomId}/join`, (action) => {
// 			console.log(action)
// 			const content = JSON.parse(action.body)
// 			console.log(content)
// 			// dispatch(setPlayers(content))
// 		})

// 		// 방장이 시작하고 서버에서 시작한다는 요청이 오면 선택했던 카드들 보내기. 보내면서 아이템 넣기
// 		client.subscribe(`/sub/room/${roomId}/start`, (action) => {
// 			client.publish({
// 				destination: 'select',
// 				body: JSON.stringify({
// 					nickname,
// 					selectedCard,
// 				}),
// 			})
// 		})

// 		// 서버에서 카드 나눠주면 게임 시작
// 		client.subscribe(`/sub/room/${roomId}/table`, (action) => {
// 			const content = JSON.parse(action.body)
// 			dispatch(setGameCards(content))
// 			setState(1)
// 			setTurn(0)
// 		})

// 		// 새 텔러 받으면 새 턴 시작
// 		client.subscribe('/sub/room/${roomId}/newteller', (action) => {
// 			const content = JSON.parse(action.body)
// 			setImteller(false)
// 			setState(1)
// 			setTurn(0)
// 			if (content.nickname === nickname) {
// 				setImteller(true)
// 				dispatch(setTime(45))
// 			}
// 		})

// 		// 텔러가 그림 묘사를 완료하면 그때부터 낚시그림 선택
// 		client.subscribe(`/sub/room/${roomId}/teller`, (action) => {
// 			const content = JSON.parse(action.body)
// 			dispatch(setDescription(content.cardMsg))
// 			dispatch(setTime(20))
// 		})

// 		// 모두 낚시그림 선택하고 서버가 모아서 보내주면 텔러그림찾기 시작
// 		client.subscribe(`/sub/room/${roomId}/other`, (action) => {
// 			const content = JSON.parse(action.body)
// 			dispatch(setTable(content.cardList))
// 			dispatch(setTime(content.time ? content.time : 45))
// 			setTurn(1)
// 		})

// 		// 아이템에 따라 효과 발동시키기
// 		client.subscribe(`/sub/room/${roomId}/item`, (action) => {
// 			const content = JSON.parse(action.body)
// 			// 미구현
// 		})

// 		// 카드 덱 채워넣기
// 		client.subscribe(`/sub/room/${roomId}/draw`, (action) => {
// 			const content = JSON.parse(action.body)
// 			dispatch(addGameCard(content))
// 		})

// 		// 유저 점수 갱신
// 		client.subscribe(`/sub/room/${roomId}/result`, (action) => {
// 			const content = JSON.parse(action.body)
// 			setResult(content.result) // useState result가 최신점수, useSelector가 이전 점수, 차이보여주고 useSelector에 반영
// 			setTurn(2)
// 			setTimeout(() => {
// 				setTurn(0)
// 			}, 10000)
// 		})

// 		// 게임 최종 결과창으로
// 		client.subscribe(`/sub/room/${roomId}/end`, (action) => {
// 			const content = JSON.parse(action.body)
// 			dispatch(setEndResult(content.result))
// 			setState(2)
// 			setTimeout(() => {
// 				setTurn(0)
// 			}, 12000)
// 		})
// 	},

// 	beforeDisconnected(frame, client) {},
// })
