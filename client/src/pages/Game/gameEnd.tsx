import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'
import podium from 'assets/image/podium.webp'

export default function GameEnd(props: any) {
	const { setState, client, roomId } = props

	const result = useSelector((state: any) => state.result)
	const roomInfo = useSelector((state: any) => state.roomInfo)

	const [endResult, setEndResult] = useState<any>([])

	useEffect(() => {
		setTimeout(() => {
			setState(0)
		}, 10000)
	}, [])

	useEffect(() => {
		const confirm = client.subscribe(`/sub/room/${roomId}/roominfo`, (action) => {
			const content = JSON.parse(action.body)
			if (!content.started) {
				setState(0)
			}
		})
		client.publish({ destination: `/pub/room/${roomId}/roominfo` })
		return () => {
			confirm.unsubscribe()
		}
	}, [])

	useEffect(() => {
		for (let nickname in result) {
			endResult.push([result[nickname], nickname])
		}
		endResult.sort().reverse()
		console.log(endResult)
		return () => {
			setEndResult([])
		}
	}, [])

	const getProfile = (nickname) => {
		return roomInfo.profiles[nickname]
	}

	// 1, 2, 3 등은 시상대에 올리기
	// endresult 0에는 점수, 1에는 닉네임
	return (
		<div>
			<div>
				1등{' '}
				{endResult[0] && (
					<div>
						<img src={getProfile(endResult[0][1])} alt="" />
						{endResult[0][1]} : {endResult[0][0]}
					</div>
				)}
			</div>
			<div>
				2등{' '}
				{endResult[0] && (
					<div>
						<img src={getProfile(endResult[1][1])} alt="" />
						{endResult[1][1]} : {endResult[1][0]}
					</div>
				)}
			</div>
			<div>
				3등{' '}
				{endResult[2] && (
					<div>
						<img src={getProfile(endResult[2][1])} alt="" />
						{endResult[2][1]} : {endResult[2][0]}
					</div>
				)}
			</div>

			{endResult.slice(3).length ? (
				<div>
					찌꺼기
					{endResult.slice(3).map((result, idx) => (
						<div key={result[1]}>
							{idx + 4}등
							<img src={getProfile(result[1])} alt="" />
							{result[1]} : {result[0]}
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
const gameResultCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: 'GongGothicMedium';
`
