import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setPhase } from 'store/modules/game'

export default function GameEnd(props: any) {
	const { setState, client, roomId } = props
	const dispatch = useDispatch()

	const result = useSelector((state: any) => state.result)
	const [endResult, setEndResult] = useState<any>([])

	useEffect(() => {
		setTimeout(() => {
			setState(0)
		}, 10000)
	})

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

	// 1, 2, 3 등은 시상대에 올리기
	// profile로 하기
	return (
		<div>
			<div>1등 {endResult[0] && `${endResult[0][1]} : ${endResult[0][0]}`}</div>
			<div>2등 {endResult[1] && `${endResult[1][1]} : ${endResult[1][0]}`}</div>
			<div>3등 {endResult[2] && `${endResult[2][1]} : ${endResult[2][0]}`}</div>

			{endResult.slice(3).length ? (
				<div>
					찌꺼기
					{endResult.slice(3).map((result, idx) => (
						<div key={result[1]}>
							{idx + 4}등 {result[1]} : {result[0]}
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
