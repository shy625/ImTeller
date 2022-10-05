import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useWebSocket } from 'actions/hooks/useWebSocket'
import { clearChat, addChat } from 'store/modules/game'
import { css } from '@emotion/react'

export default function Chat() {
	const dispatch = useDispatch()

	const { roomId } = useParams()
	const chats = useSelector((state: any) => state.chats)
	const { nickname } = useSelector((state: any) => state.currentUser)
	const email = useSelector((state: any) => state.email) || localStorage.getItem('email')
	const [msgInput, setMsgInput] = useState('')
	const [ws, setWs] = useState<any>('')

	useEffect(() => {
		dispatch(clearChat())
	}, [])

	useEffect(() => {
		const client = useWebSocket({ email })
		client.onConnect = (frame) => {
			client.subscribe(`/sub/room/${roomId}/chat`, (response) => {
				const content = JSON.parse(response.body)
				const time = new Date()
				content.time = time.toLocaleString()
				dispatch(addChat(content))
			})
		}
		client.activate()
		setWs(client)
		return () => {
			client.deactivate()
		}
	}, [])

	const send = () => {
		ws.publish({
			destination: `/pub/room/${roomId}/chat`,
			body: JSON.stringify({
				nickname,
				userMsg: msgInput,
			}),
		})
		setMsgInput('')
	}

	const isMyMsg = (nick) => {
		if (nick === nickname) return true
		return false
	} // 이 값에 따라서 style 다르게. 카톡처럼 내꺼면 오른쪽

	return (
		<div css={chat}>
			<div>
				{chats.length
					? chats.map((chat, idx) => (
							<div
								key={String(idx) + chat.time}
								style={isMyMsg(chat.nickname) ? { backgroundColor: 'white' } : null}
							>
								<div>{chat.nickname}</div>
								<div>{chat.userMsg}</div>
								<div>{chat.time}</div>
							</div>
					  ))
					: null}
			</div>
			<div>
				<input
					type="text"
					onChange={(e) => {
						setMsgInput(e.target.value)
					}}
					value={msgInput}
					onKeyDown={(e) => {
						if (e.key === 'Enter') send()
					}}
				/>
				<div onClick={send}>전송</div>
			</div>
		</div>
	)
}
const chat = css({
	border: '1px solid black',
	width: '30%',
	height: '80vh',
})
