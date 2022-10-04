import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setPhase } from 'store/modules/game'

export default function GameEnd(props: any) {
	const { setState } = props
	const dispatch = useDispatch()

	const result = useSelector((state: any) => state.result)
	const [endResult, setEndResult] = useState<any>([])

	useEffect(() => {
		setTimeout(() => {
			setState(0)
			dispatch(setPhase(''))
		}, 15000)
	})

	useEffect(() => {
		const copy = []
		for (let nickname in endResult) {
			copy.push([endResult[nickname], nickname])
			console.log(copy)
		}
		// console.log(copy)
		// setEndResult(copy)
	}, [result])

	// 1, 2, 3 등은 시상대에 올리기
	// profile로 하기
	return (
		<div>
			end
			{/* 1등 : {endResult[0][1]} | {endResult[0][0]}
			<br />
			2등 : {endResult[1][0]} | {endResult[1][1]}
			<br />
			3등 : {endResult[2][0]} | {endResult[3][1]}
			<br />
			{endResult.slice(3).map((player) => (
				<div key={player[1]}>
					{player[1]} | {player[0]}
				</div>
			))} */}
		</div>
	)
}
