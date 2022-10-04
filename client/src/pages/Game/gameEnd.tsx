import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function GameEnd(props: any) {
	const { setState } = props
	const result = useSelector((state: any) => state.result)
	const [endResult, setEndResult] = useState<any>([])

	useEffect(() => {
		setTimeout(() => {
			setState(0)
		}, 15000)
	})

	useEffect(() => {
		const copy = []
		for (let nickname in endResult) {
			copy.push([endResult[nickname], nickname])
		}
		console.log(copy)
		// copy.sort((a, b) => a[0] - b[0])
		setEndResult(copy)
	}, [result])

	console.log(result, endResult)
	// 1, 2, 3 등은 시상대에 올리기
	// profile로 하기
	return (
		<div>
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
