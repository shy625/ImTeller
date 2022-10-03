import { useSelector } from 'react-redux'

export default function GameCard(props: any) {
	// 아이템 효과있으면 적용시키기
	const { phase, cardUrl } = props
	return (
		<div>
			<img src={cardUrl} alt="" />
			asdf
		</div>
	)
}
