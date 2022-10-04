import { useSelector } from 'react-redux'

export default function GameCard(props: any) {
	// 아이템 효과있으면 적용시키기
	const { cardUrl } = props
	const phase = useSelector((state: any) => state.phase)

	return (
		<div>
			<img style={{ height: '200px' }} src={cardUrl} alt="" />
		</div>
	)
}
