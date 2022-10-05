import { useDispatch } from 'react-redux'

import itemDetail from 'actions/functions/itemDetail'

import item1 from 'assets/image/item1.webp'
import item2 from 'assets/image/item2.webp'
import item3 from 'assets/image/item3.webp'
import item4 from 'assets/image/item4.webp'
import item5 from 'assets/image/item5.webp'
import item6 from 'assets/image/item6.webp'

export default function Item(props: any) {
	const dispatch = useDispatch()

	const { cardId, grade, effect, effectNum } = props.item
	const [effectPre, effectPost, effectName] = itemDetail(effect, effectNum) // effectPre는 hover했을 때

	const src = { 1: item1, 2: item2, 3: item3, 4: item4, 5: item5, 6: item6 }[effect]

	return (
		<div style={{ width: '50px' }}>
			<img src={src} alt={effectPre} title={effectName} />
			<div>{effectNum}</div>
		</div>
	)
}
