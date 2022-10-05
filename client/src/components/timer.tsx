import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export default function Timer() {
	const time = useSelector((state: any) => state.time)
	const interval = useRef(null)
	const initialTime = useRef(time)
	const [viewTime, setViewTime] = useState(0)

	useEffect(() => {
		interval.current = setInterval(() => {
			initialTime.current -= 1
			setViewTime(initialTime.current)
		}, 1000)
		return () => clearInterval(interval.current)
	}, [])

	useEffect(() => {
		initialTime.current = time
	}, [time])

	return <div>{viewTime >= 0 ? viewTime + 's' : null}</div>
}
